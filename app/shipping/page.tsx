import { Truck, Globe, Box, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ShippingPage() {
    return (
        <div className="container mx-auto py-12 px-4 space-y-16">
            <section className="text-center space-y-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-display text-primary">Shipping Information</h1>
                <p className="text-xl text-muted-foreground">
                    Specialized freight solutions for delicate prehistoric cargo.
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-2xl p-8 border shadow-sm space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <Truck className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Freight Shipping</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        Due to the size and delicate nature of our replicas, most items are shipped via specialized freight carriers. This ensures your piece arrives safely in a custom-built wooden crate.
                    </p>
                </div>

                <div className="bg-card rounded-2xl p-8 border shadow-sm space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <Globe className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Global Delivery</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        We ship worldwide! Whether you are a museum in London, a collector in Tokyo, or a park in Texas, we can arrange logistics to your location. International shipments may be subject to customs duties.
                    </p>
                </div>

                <div className="bg-card rounded-2xl p-8 border shadow-sm space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <Box className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Custom Crating</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        Safety is our priority. Every skeleton and large replica is packed in a custom-engineered wooden crate with foam padding to prevent movement and damage during transit.
                    </p>
                </div>

                <div className="bg-card rounded-2xl p-8 border shadow-sm space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <Clock className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Lead Times</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        In-stock items ship within 5-7 business days. Custom orders or made-to-order pieces typically require 4-8 weeks for production and curing before they are ready for crating.
                    </p>
                </div>
            </div>

            <section className="bg-stone-900 text-stone-50 rounded-3xl p-12 text-center space-y-6">
                <h2 className="text-3xl font-bold font-display">Need a Shipping Quote?</h2>
                <p className="text-stone-300 max-w-2xl mx-auto">
                    Shipping costs vary significantly based on weight, dimensions, and destination. Add items to your quote request to get an accurate estimate.
                </p>
                <Button asChild variant="secondary" size="lg" className="rounded-full">
                    <Link href="/contact">Request Quote</Link>
                </Button>
            </section>
        </div>
    );
}
