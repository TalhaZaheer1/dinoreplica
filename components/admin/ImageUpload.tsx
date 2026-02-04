'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, X } from 'lucide-react';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    onRemove: (url: string) => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error(error);
            alert('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value && (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(value)} variant="destructive" size="icon">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={value}
                        />
                    </div>
                )}
            </div>
            <div>
                <label className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Upload Image
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={onUpload}
                        disabled={loading}
                    />
                </label>
            </div>
        </div>
    );
}
