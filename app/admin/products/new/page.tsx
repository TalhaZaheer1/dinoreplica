import prisma from '@/lib/prisma';
import { ProductForm } from '@/components/admin/products/ProductForm';

async function getCategories() {
    return await prisma.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' }
    });
}

export default async function NewProductPage() {
    const categories = await getCategories();

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <ProductForm categories={categories} />
        </div>
    );
}
