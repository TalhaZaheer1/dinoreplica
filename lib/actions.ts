'use server';

import { signIn } from '@/auth';
import prisma from '@/lib/prisma';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const email = formData.get('email') as string;
        const user = await prisma.user.findUnique({
            where: { email },
            select: { role: true },
        });

        const redirectTo = user?.role === 'ADMIN' ? '/admin' : '/';

        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirectTo,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export async function deleteProduct(id: number) {
    'use server';
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        throw new Error('Unauthorized');
    }

    await prisma.product.delete({
        where: { id },
    });

    revalidatePath('/admin/products');
}

export async function deleteCategory(id: number) {
    'use server';
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        throw new Error('Unauthorized');
    }

    try {
        await prisma.category.delete({
            where: { id },
        });
        revalidatePath('/admin/categories');
    } catch (error) {
        console.error('Failed to delete category:', error);
        throw new Error('Failed to delete category');
    }
}
