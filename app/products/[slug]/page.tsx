import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Ruler, Weight, Tag, Truck } from 'lucide-react';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { EmailRequestButton } from '@/components/products/EmailRequestButton';

type Props = {
    params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
    return await prisma.product.findUnique({
        where: { slug },
        include: { category: true },
    });
}

export default async function ProductDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <Link
                href="/products"
                className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors font-medium"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Catalog
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Gallery Section */}
                <div>
                    <ProductImageGallery
                        images={Array.isArray(product.images) ? (product.images as string[]) : []}
                        title={product.title}
                    />
                </div>

                {/* Product Info Section */}
                <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-700">
                    <div>
                        {product.category && (
                            <Link href={`/products?category=${product.category.slug}`} className="text-accent hover:text-accent/80 font-bold tracking-widest uppercase text-xs mb-3 block transition-colors">
                                {product.category.name}
                            </Link>
                        )}
                        <h1 className="text-4xl md:text-6xl font-bold font-display text-primary mb-4 leading-tight">
                            {product.title}
                        </h1>
                        <p className="text-muted-foreground text-lg border-l-4 border-primary/20 pl-4 italic">
                            Model: {product.model}
                        </p>
                    </div>

                    <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-4xl font-bold text-foreground">
                                ${Number(product.price).toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground font-medium bg-muted px-2 py-1 rounded-md">
                                + Shipping (Quote Required)
                            </span>
                        </div>

                        {/* Call to Action */}
                        <div className="space-y-4">
                            <EmailRequestButton
                                productName={product.title}
                                productModel={product.model}
                                className="w-full text-lg h-16 rounded-xl shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all"
                            >
                                Request Price & Freight Quote
                            </EmailRequestButton>
                            <p className="text-xs text-center text-muted-foreground max-w-sm mx-auto">
                                * We do not sell online directly. Clicking this button will open your email client with a pre-filled inquiry.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8 divide-y divide-border/40">
                        <div className="pt-6">
                            <h3 className="text-2xl font-bold font-display text-foreground mb-4 flex items-center gap-2">
                                Description
                            </h3>
                            <div className="prose prose-stone prose-lg max-w-none text-muted-foreground leading-relaxed">
                                {product.description || "No description available for this specimen."}
                            </div>
                        </div>

                        <div className="pt-8">
                            <h3 className="text-xl font-bold font-display text-foreground mb-6">Specifications</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-stone-50 p-5 rounded-xl border border-stone-100 flex items-start gap-4 hover:border-primary/20 transition-colors">
                                    <div className="p-2 bg-white rounded-full shadow-sm text-primary">
                                        <Ruler className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wide mb-1">Dimensions</h4>
                                        <p className="text-base text-muted-foreground font-medium">
                                            {product.length || '-'} x {product.width || '-'} x {product.height || '-'} {product.dimensionsUnits}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-stone-50 p-5 rounded-xl border border-stone-100 flex items-start gap-4 hover:border-primary/20 transition-colors">
                                    <div className="p-2 bg-white rounded-full shadow-sm text-primary">
                                        <Weight className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wide mb-1">Weight</h4>
                                        <p className="text-base text-muted-foreground font-medium">
                                            {product.weight || '-'} {product.weightUnits}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-stone-50 p-5 rounded-xl border border-stone-100 flex items-start gap-4 col-span-1 sm:col-span-2 hover:border-primary/20 transition-colors">
                                    <div className="p-2 bg-white rounded-full shadow-sm text-primary">
                                        <Truck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wide mb-1">Shipping Information</h4>
                                        <p className="text-base text-muted-foreground">
                                            Requires specialized freight shipping. Please contact us for a detailed crate size and weight estimate.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
