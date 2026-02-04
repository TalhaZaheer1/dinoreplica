import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
        });

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, description, image } = body;

        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                image,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        // Check if products exist
        const items = await prisma.product.count({
            where: { categoryId: parseInt(id) }
        });

        if (items > 0) {
            return NextResponse.json({ error: 'Cannot delete category with associated products' }, { status: 400 });
        }

        await prisma.category.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
