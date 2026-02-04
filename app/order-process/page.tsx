import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Calculator, Truck, CreditCard } from 'lucide-react';

export default function OrderProcessPage() {
    const steps = [
        {
            icon: <FileText className="h-8 w-8" />,
            title: "1. Request a Quote",
            description: "Browse our catalog and request a quote for the items you are interested in. We don't sell directly online to ensure accurate shipping calculations."
        },
        {
            icon: <Calculator className="h-8 w-8" />,
            title: "2. Receive Estimate",
            description: "Our team will calculate the best freight shipping rate to your location and send you a formal invoice including lead times and total costs."
        },
        {
            icon: <CreditCard className="h-8 w-8" />,
            title: "3. Confirm & Pay",
            description: "Approve the invoice and make payment via Bank Transfer or Credit Card. For custom orders, a deposit may be required to start production."
        },
        {
            icon: <Truck className="h-8 w-8" />,
            title: "4. Production & Shipping",
            description: "Your item is inspected, professionally crated, and shipped. We provide tracking details so you can prepare for arrival."
        }
    ];

    return (
        <div className="container mx-auto py-12 px-4 space-y-16">
            <section className="text-center space-y-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-display text-primary">How to Order</h1>
                <p className="text-xl text-muted-foreground">
                    A seamless process from discovery to delivery.
                </p>
            </section>

            <div className="relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-background pt-4">
                            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6 relative z-10">
                                {step.icon}
                            </div>
                            <div className="text-center space-y-3 px-4">
                                <h3 className="text-xl font-bold font-display">{step.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-3xl mx-auto bg-stone-50 rounded-2xl p-8 border border-stone-200 text-center space-y-6">
                <h3 className="text-2xl font-bold font-display text-primary">Ready to start?</h3>
                <p className="text-muted-foreground">
                    Explore our collection of museum-quality replicas and find the perfect addition to your exhibit.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg" className="rounded-full shadow-md">
                        <Link href="/products">Browse Catalog</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full">
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
