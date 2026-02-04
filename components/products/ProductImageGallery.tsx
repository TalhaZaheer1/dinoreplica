"use client";

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProductImageGalleryProps = {
    images: string[];
    title: string;
};

export function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const nextImage = useCallback(() => {
        setSelectedIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextImage, prevImage]);

    if (images.length === 0) {
        return (
            <div className="relative aspect-square bg-stone-100 rounded-2xl overflow-hidden shadow-lg border border-border/20">
                <div className="absolute inset-0 flex items-center justify-center text-9xl text-stone-300 select-none">
                    🦖
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="relative aspect-square bg-stone-100 rounded-2xl overflow-hidden shadow-lg border border-border/20 group">
                <Image
                    src={images[selectedIndex]}
                    alt={`${title} - Image ${selectedIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-300"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-6 w-6 text-foreground" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-6 w-6 text-foreground" />
                        </Button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={cn(
                                "relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                                selectedIndex === i ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`${title} thumbnail ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="96px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
