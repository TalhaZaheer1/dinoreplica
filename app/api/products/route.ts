import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {};
    if (category) where.category = { slug: category };
    if (search) where.title = { contains: search }; // SQLite/MySQL simple contains

    try {
        const products = await prisma.product.findMany({
            where,
            include: { category: true },
            orderBy: { title: 'asc' },
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
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

        // Auto-generate slug
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Math.floor(Math.random() * 1000);

        const product = await prisma.product.create({
            data: {
                title,
                slug,
                model,
                price,
                description,
                weight: weight ? parseFloat(weight) : null,
                length: length ? parseFloat(length) : null,
                width: width ? parseFloat(width) : null,
                height: height ? parseFloat(height) : null,
                categoryId: categoryId ? parseInt(categoryId) : null,
                isVisible: isVisible ?? true,
                images: images ?? []
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
