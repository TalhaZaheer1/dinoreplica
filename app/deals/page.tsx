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

            {/* Jurassic Park Package */}
            <section className="bg-stone-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative border border-stone-800">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
                    <span className="text-9xl">🦖</span>
                </div>
                <div className="relative z-10 space-y-8">
                    <div className="border-b border-white/20 pb-6">
                        <h2 className="text-3xl md:text-5xl font-bold font-display text-red-500 mb-2 uppercase tracking-tight">Jurassic Park Package</h2>
                        <p className="text-xl md:text-2xl font-light text-stone-300">
                            40% OFF LIST PRICE — SHIPPED DIRECTLY TO YOUR FACILITY
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                                    The Deal
                                </h3>
                                <ul className="space-y-3 text-stone-300">
                                    <li className="flex gap-3">
                                        <span className="text-red-500 font-bold">✓</span>
                                        <span><strong>40% OFF LIST PRICE:</strong> You pay 60% of the total list price plus sea freight.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-500 font-bold">✓</span>
                                        <span><strong>Full Container Load:</strong> Must have between 65 and 70 CBM. Custom design your load with different types/quantities.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-500 font-bold">✓</span>
                                        <span><strong>Sea Freight:</strong> You pay sea freight (Usually around <strong>$7,000.00</strong> for 40' HC).</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-500 font-bold">✓</span>
                                        <span><strong>Managed Delivery:</strong> I (Karl Walker) will come out and manage the delivery and unloading for you.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-500 font-bold">✓</span>
                                        <span><strong>Timeline:</strong> Takes about 12 weeks from order date to delivery.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl">
                                <h4 className="font-bold text-red-400 mb-2 text-sm uppercase tracking-wider">Note: Exclusions Apply</h4>
                                <p className="text-stone-300 text-sm">
                                    Select dinosaurs are <strong>25% OFF</strong> in this package:
                                    <br />• 230092 RHOETOSAURUS
                                    <br />• 210199 AUSTRALOTITAN
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6 flex flex-col justify-center">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                                <h3 className="text-xl font-bold text-white">How to Order</h3>
                                <ol className="space-y-4 text-stone-300 list-decimal list-inside marker:text-red-500 marker:font-bold">
                                    <li>Go to <span className="text-white font-medium">dinosaurresinreplica.com</span> (this site).</li>
                                    <li>Download the <strong>All Products Order Form</strong> (Excel).</li>
                                    <li>Mark the animals and quantities you would like.</li>
                                    <li>Email the form to me for a freight cost estimate.</li>
                                </ol>
                            </div>

                            <div className="text-center space-y-4 pt-4">
                                <p className="text-stone-400 text-sm font-medium uppercase tracking-widest">Contact for Package Details</p>
                                <a href="mailto:dinosaurresinreplica@gmail.com" className="block text-2xl font-bold text-white hover:text-red-400 transition-colors">
                                    dinosaurresinreplica@gmail.com
                                </a>
                                <p className="text-xl font-bold text-white">817-703-1619 <span className="text-stone-500 text-base font-normal">(Karl Walker)</span></p>
                                <div className="flex justify-center gap-4 pt-4">
                                    <Button asChild size="lg" className="rounded-full bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg shadow-red-900/20">
                                        <Link href="mailto:dinosaurresinreplica@gmail.com">Email for Quote</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
