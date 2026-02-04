'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, X, ImageIcon } from 'lucide-react';
import Image from 'next/image';

type ProductFormProps = {
    initialData?: any;
    categories: { id: number; name: string }[];
};

export function ProductForm({ initialData, categories }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    // Parse images if string, otherwise assume array or null
    const [images, setImages] = useState<string[]>(() => {
        if (!initialData?.images) return [];
        if (Array.isArray(initialData.images)) return initialData.images;
        try {
            return JSON.parse(initialData.images);
        } catch {
            return [];
        }
    });

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (res.ok) {
                setImages((prev) => [...prev, data.url]);
            } else {
                alert('Upload failed');
            }
        } catch (err) {
            console.error(err);
            alert('Upload error');
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    }

    function removeImage(index: number) {
        setImages((prev) => prev.filter((_, i) => i !== index));
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(event.currentTarget);
        const data: any = Object.fromEntries(formData.entries());

        // Checkbox handling
        data.isVisible = formData.get('isVisible') === 'on';

        // Include images
        data.images = images;

        // Ensure numbers are numbers
        if (data.price) data.price = parseFloat(data.price);
        if (data.categoryId) data.categoryId = parseInt(data.categoryId);
        if (data.length) data.length = parseFloat(data.length);
        if (data.width) data.width = parseFloat(data.width);
        if (data.height) data.height = parseFloat(data.height);

        try {
            const url = initialData
                ? `/api/products/${initialData.id}`
                : '/api/products';

            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to save product');

            router.push('/admin/products');
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
                <CardTitle>{initialData ? 'Edit Product' : 'New Product'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Product Title</label>
                            <input
                                name="title"
                                required
                                defaultValue={initialData?.title}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Model / SKU</label>
                            <input
                                name="model"
                                required
                                defaultValue={initialData?.model}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price ($)</label>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                required
                                defaultValue={initialData?.price}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                name="categoryId"
                                defaultValue={initialData?.categoryId || ''}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="">Select Category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            defaultValue={initialData?.description || ''}
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium">Product Images</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {images.map((url, i) => (
                                <div key={i} className="relative aspect-square rounded-md overflow-hidden border bg-muted group">
                                    <Image
                                        src={url}
                                        alt="Product"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            <label className="flex flex-col items-center justify-center aspect-square rounded-md border border-dashed hover:bg-muted/50 cursor-pointer transition-colors">
                                {uploading ? (
                                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                ) : (
                                    <>
                                        <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                                        <span className="text-xs text-muted-foreground">Upload</span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleUpload}
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Length (in)</label>
                            <input name="length" type="number" step="0.1" defaultValue={initialData?.length} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Width (in)</label>
                            <input name="width" type="number" step="0.1" defaultValue={initialData?.width} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Height (in)</label>
                            <input name="height" type="number" step="0.1" defaultValue={initialData?.height} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="isVisible"
                            id="isVisible"
                            defaultChecked={initialData?.isVisible ?? true}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor="isVisible" className="text-sm font-medium leading-none">
                            Visible on Storefront
                        </label>
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {initialData ? 'Update Product' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
