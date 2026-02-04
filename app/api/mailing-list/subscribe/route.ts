import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { auth } from '@/auth';

const subscribeSchema = z.object({
    email: z.string().email(),
});

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { email } = subscribeSchema.parse(body);

        const existing = await prisma.mailingList.findUnique({
            where: { email },
        });

        if (existing) {
            return NextResponse.json(
                { message: 'Already subscribed' },
                { status: 200 }
            );
        }

        await prisma.mailingList.create({
            data: { email },
        });

        return NextResponse.json({ message: 'Subscribed successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid email', details: error.issues },
                { status: 400 }
            );
        }
        console.error('Mailing list error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
