'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';

type CategoryFormProps = {
    initialData?: {
        id: number;
        name: string;
        description?: string | null;
        image?: string | null;
    };
};

export function CategoryForm({ initialData }: CategoryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState(initialData?.image || '');

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            image: imageUrl,
        };

        try {
            const url = initialData
                ? `/api/categories/${initialData.id}`
                : '/api/categories';

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to save category');

            router.push('/admin/categories');
            router.refresh();
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{initialData ? 'Edit Category' : 'New Category'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            name="name"
                            required
                            defaultValue={initialData?.name}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="e.g. Theropods"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            defaultValue={initialData?.description || ''}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Category description..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category Image</label>
                        <ImageUpload
                            value={imageUrl}
                            onChange={(url) => setImageUrl(url)}
                            onRemove={() => setImageUrl('')}
                        />
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {initialData ? 'Update Category' : 'Create Category'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
