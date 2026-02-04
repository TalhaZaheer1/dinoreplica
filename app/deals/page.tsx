import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

async function getDeals() {
    // Determine deals as products where listPrice is greater than price (sell_price)
    // Prisma decimal comparison might need raw query or just fetch and filter if dataset small
    // For now, simpler to fetch all visible products with listPrice != null
    const products = await prisma.product.findMany({
        where: {
            isVisible: true,
            listPrice: { not: null }
        },
        include: { category: true }
    });

    // Filter in JS for now to handle decimal comparison simply
    return products.filter(p => p.listPrice && Number(p.listPrice) > Number(p.price));
}

export default async function DealsPage() {
    const deals = await getDeals();

    return (
        <div className="container mx-auto py-12 px-4 space-y-12">
            <section className="text-center space-y-6">
                <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 text-sm font-bold tracking-wider">
                    LIMITED TIME OFFERS
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-display text-primary">Special Offers</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Exclusive savings on select museum-quality pieces.
                </p>
            </section>

            {deals.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-2xl">
                    <p className="text-2xl text-muted-foreground mb-4">No active deals at the moment.</p>
                    <p className="text-muted-foreground">Check back soon or browse our full collection.</p>
                    <Button asChild className="mt-8 rounded-full" size="lg">
                        <Link href="/products">View All Products</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {deals.map((product) => {
                        const savings = Number(product.listPrice) - Number(product.price);
                        const percent = Math.round((savings / Number(product.listPrice)) * 100);

                        return (
                            <div key={product.id} className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-border/40 hover:border-primary/20 relative">
                                {/* Discount Badge */}
                                <div className="absolute top-4 right-4 z-10 bg-red-600 text-white font-bold px-3 py-1 rounded-full shadow-lg">
                                    SAVE {percent}%
                                </div>

                                <div className="relative h-72 overflow-hidden bg-stone-100">
                                    <div className="absolute inset-0 flex items-center justify-center text-5xl text-stone-300">
                                        🦖
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                                            <Link href={`/products/${product.slug}`} className="before:absolute before:inset-0">
                                                {product.title}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {product.model}
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between relative z-10">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground line-through decoration-red-500">
                                                ${Number(product.listPrice).toFixed(2)}
                                            </span>
                                            <span className="text-xl font-bold text-red-600">
                                                ${Number(product.price).toFixed(2)}
                                            </span>
                                        </div>
                                        <Button asChild size="sm" variant="outline" className="rounded-full">
                                            <Link href={`/products/${product.slug}`}>View Deals</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
