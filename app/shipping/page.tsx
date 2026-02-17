import { Truck, Globe, Box, Clock, ShieldCheck, Ship, MapPin, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ShippingPage() {
    return (
        <div className="container mx-auto py-12 px-4 space-y-16">
            <section className="text-center space-y-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-display text-primary uppercase tracking-tight">Shipping & Manufacturing</h1>
                <p className="text-xl text-muted-foreground">
                    Comprehensive guide to our production timelines, shipping methods, and global delivery options.
                </p>
            </section>

            {/* Timelines & Manufacturing */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-2xl p-8 border shadow-sm space-y-6">
                    <div className="flex items-center gap-4 border-b border-border/50 pb-4">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <Clock className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Production Timelines</h3>
                    </div>
                    <ul className="space-y-4 text-muted-foreground list-disc list-inside">
                        <li><strong className="text-foreground">Stock Items:</strong> Shipped immediately.</li>
                        <li><strong className="text-foreground">Made to Order:</strong> Most items are manufactured in the Philippines.</li>
                        <li><strong className="text-foreground">Manufacturing Time:</strong> Usually 6 to 8 weeks from order date.</li>
                        <li><strong className="text-foreground">Transit Time:</strong> Allow 4 to 5 weeks for ocean freight to arrive at our facility in Ft. Worth, Texas.</li>
                    </ul>
                </div>

                <div className="bg-card rounded-2xl p-8 border shadow-sm space-y-6">
                    <div className="flex items-center gap-4 border-b border-border/50 pb-4">
                        <div className="p-3 bg-accent/10 rounded-full text-accent">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Packing & Crating</h3>
                    </div>
                    <ul className="space-y-4 text-muted-foreground list-disc list-inside">
                        <li><strong className="text-foreground">Crating Charge:</strong> Applies to all items requiring special wood crating for freight interaction. Cost varies by animal size.</li>
                        <li><strong className="text-foreground">Assembly:</strong> Some animals are crafted in two pieces for ease of shipping and to reduce breakage risk.</li>
                        <li><strong className="text-foreground">Special Packaging:</strong> Even smaller items may require a special packaging charge to ensure safety.</li>
                    </ul>
                </div>
            </div>

            {/* Shipping Methods */}
            <section className="bg-muted/30 rounded-3xl p-8 md:p-12 space-y-8">
                <h2 className="text-3xl font-bold font-display text-center">Shipping Methods</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-background rounded-xl p-6 shadow-sm border text-center space-y-4">
                        <Box className="h-10 w-10 text-primary mx-auto" />
                        <h3 className="text-xl font-bold">Standard Shipping</h3>
                        <p className="text-sm text-muted-foreground">
                            Smaller items can be shipped via <strong>USPS or UPS</strong>.
                        </p>
                    </div>
                    <div className="bg-background rounded-xl p-6 shadow-sm border text-center space-y-4">
                        <Truck className="h-10 w-10 text-primary mx-auto" />
                        <h3 className="text-xl font-bold">Freight Shipping</h3>
                        <p className="text-sm text-muted-foreground">
                            Larger items must be hauled on a <strong>flatbed trailer</strong>. Shipping is quoted per animal.
                        </p>
                    </div>
                    <div className="bg-background rounded-xl p-6 shadow-sm border text-center space-y-4">
                        <MapPin className="h-10 w-10 text-primary mx-auto" />
                        <h3 className="text-xl font-bold">Direct Delivery</h3>
                        <p className="text-sm text-muted-foreground">
                            Large Dinosaurs and Animals are often <strong>delivered personally by me</strong> to ensure safe arrival.
                        </p>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                        * All items are priced WITHOUT freight. Tax will apply if applicable.
                    </p>
                </div>
            </section>

            {/* Full Container Loads */}
            <section className="bg-secondary text-secondary-foreground rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Ship className="w-96 h-96" />
                </div>
                <div className="relative z-10 space-y-8">
                    <div className="border-b border-white/10 pb-6">
                        <h2 className="text-3xl font-bold font-display text-white mb-2">
                            Full Container Loads
                        </h2>
                        <p className="text-stone-400">
                            For large orders, 20' or 40' containers can be shipped directly to you for a significant discount advantage.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-accent flex items-center gap-2">
                                <Box className="h-5 w-5" />
                                Requirements & Ordering
                            </h3>
                            <ul className="space-y-3 text-stone-300">
                                <li className="flex gap-3">
                                    <span className="text-accent font-bold">•</span>
                                    <span><strong>Minimum Volume:</strong> 30 CBM for a 20' container or 70 CBM for a 40' container.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent font-bold">•</span>
                                    <span><strong>Process:</strong> Email me the items wanted. Use the price order form to calculate CBM (download, mark items, send to me).</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent font-bold">•</span>
                                    <span><strong>Quote:</strong> I will send back the discounted cost based on your container selection.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-accent flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Payment Terms
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="font-bold text-white mb-1">USA Orders</h4>
                                    <ul className="text-sm text-stone-300 list-disc list-inside space-y-1">
                                        <li>$2,000 upfront when ordered.</li>
                                        <li>$10,000 when ready to load on ship.</li>
                                        <li>You pay ocean freight (large volume discounts apply).</li>
                                        <li>I invoice you after it arrives.</li>
                                        <li>I personally inventory and check for damage upon arrival.</li>
                                    </ul>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4">
                                    <h4 className="font-bold text-white mb-1">International Orders</h4>
                                    <ul className="text-sm text-stone-300 list-disc list-inside space-y-1">
                                        <li>$10,000 to order.</li>
                                        <li>$10,000 before loading on ship.</li>
                                        <li>I manage unload, inventory, and inspect for damages.</li>
                                        <li>Balance plus freight due via check upon arrival.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex justify-center pt-8">
                <Button asChild size="lg" className="rounded-full shadow-lg px-8">
                    <Link href="/contact">Request a Freight Quote</Link>
                </Button>
            </div>
        </div>
    );
}
