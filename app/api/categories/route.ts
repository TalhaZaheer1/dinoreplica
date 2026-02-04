import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { slugify } from '@/lib/utils'; // Need to create slugify

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: { _count: { select: { products: true } } },
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, image } = body;

        // Simple validation
        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const category = await prisma.category.create({
            data: {
                name,
                slug: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''), // Basic slugify
                description,
                image,
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
