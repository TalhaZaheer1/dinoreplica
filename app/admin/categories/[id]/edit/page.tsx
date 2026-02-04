import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { CategoryForm } from '@/components/admin/categories/CategoryForm';

type Props = {
    params: Promise<{ id: string }>;
};

async function getCategory(id: string) {
    return await prisma.category.findUnique({
        where: { id: parseInt(id) },
    });
}

export default async function EditCategoryPage({ params }: Props) {
    const { id } = await params;
    const category = await getCategory(id);

    if (!category) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <CategoryForm initialData={category} />
        </div>
    );
}
