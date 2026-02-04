import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Standard Next.js Dynamic Route Param Type
) {
    const session = await auth();
    // if (!session || session.user?.role !== 'ADMIN') {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json({ error: 'Status is required' }, { status: 400 });
        }

        const validStatuses = ['PENDING', 'REPLIED', 'ARCHIVED'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const inquiry = await prisma.inquiry.update({
            where: { id: parseInt(id) },
            data: { status },
        });

        return NextResponse.json(inquiry);
    } catch (error) {
        console.error("Error updating inquiry:", error);
        return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
    }
}
