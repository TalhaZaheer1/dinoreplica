import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { ProductForm } from '@/components/admin/products/ProductForm';

type Props = {
    params: Promise<{ id: string }>;
};

async function getCategories() {
    return await prisma.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' }
    });
}

async function getProduct(id: string) {
    return await prisma.product.findUnique({
        where: { id: parseInt(id) },
    });
}

export default async function EditProductPage({ params }: Props) {
    const resolvedParams = await params;
    const [product, categories] = await Promise.all([
        getProduct(resolvedParams.id),
        getCategories(),
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <ProductForm initialData={product} categories={categories} />
        </div>
    );
}
