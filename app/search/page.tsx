import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { redirect } from 'next/navigation';
import { EmailRequestButton } from '@/components/products/EmailRequestButton';

export const dynamic = 'force-dynamic';

async function searchProducts(query: string) {
    if (!query) return [];

    return await prisma.product.findMany({
        where: {
            OR: [
                { title: { contains: query } }, // removed mode: 'insensitive' for compatibility without checking mysql collation, but typically fine
                { description: { contains: query } },
                { model: { contains: query } }
            ],
            isVisible: true
        },
        include: { category: true }
    });
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const products = q ? await searchProducts(q) : [];

    async function searchAction(formData: FormData) {
        'use server';
        const query = formData.get('q');
        if (query) {
            redirect(`/search?q=${encodeURIComponent(query.toString())}`);
        }
    }

    return (
        <div className="container mx-auto py-12 px-4 space-y-8">
            <section className="text-center space-y-6 max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold font-display text-primary">Search Catalog</h1>
                <form action={searchAction} className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <input
                            name="q"
                            defaultValue={q}
                            placeholder="Search query..."
                            className="w-full pl-10 h-12 rounded-xl border bg-background px-3 text-sm focus:ring-2 ring-primary/20 outline-none transition-all"
                        />
                    </div>
                    <Button type="submit" size="lg" className="rounded-xl">Search</Button>
                </form>
            </section>

            {q && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold font-display">
                        Results for &ldquo;{q}&rdquo; ({products.length})
                    </h2>

                    {products.length === 0 ? (
                        <p className="text-muted-foreground">No matches found. Try refining your search.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product: any) => (
                                <div key={product.id} className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-border/40 hover:border-primary/20">
                                    <div className="relative h-64 overflow-hidden bg-stone-100">
                                        <div className="absolute inset-0 flex items-center justify-center text-5xl text-stone-300">
                                            🦖
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex-1">
                                            {product.category && (
                                                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                                                    {product.category.name}
                                                </p>
                                            )}
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
                                            <span className="text-xl font-bold text-secondary">
                                                ${Number(product.price).toFixed(2)}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <EmailRequestButton
                                                    productName={product.title}
                                                    productModel={product.model}
                                                    size="sm"
                                                    variant="secondary"
                                                >
                                                    Request Quote
                                                </EmailRequestButton>
                                                <Link href={`/products/${product.slug}`} className="text-sm font-semibold text-primary group-hover:underline">
                                                    Details &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
