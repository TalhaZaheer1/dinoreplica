import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
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
        const {
            title,
            model,
            price,
            categoryId,
            description,
            weight,
            length,
            width,
            height,
            isVisible,
            images
        } = body;

        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                title,
                model,
                price,
                description,
                weight: weight ? parseFloat(weight) : null,
                length: length ? parseFloat(length) : null,
                width: width ? parseFloat(width) : null,
                height: height ? parseFloat(height) : null,
                categoryId: categoryId ? parseInt(categoryId) : null,
                isVisible: isVisible ?? true,
                images: images ?? undefined // Use undefined to skip update if null, though ProductForm handling suggests replacing
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.product.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
