import { SimpleAccordion } from '@/components/ui/accordion';

export default function FAQPage() {
    const faqs = [
        {
            id: "item-1",
            title: "Do you ship internationally?",
            content: "Yes, we ship worldwide using specialized freight carriers. We can arrange delivery to museums, institutions, and private addresses globally."
        },
        {
            id: "item-2",
            title: "Are these real fossils?",
            content: "No, these are museum-quality resin replicas. They are cast from molds of original fossils to ensure scientific accuracy and detail, but they are durable and suitable for display."
        },
        {
            id: "item-3",
            title: "How long is the production time?",
            content: "Items in stock ship within 5-7 days. Built-to-order items typically require 4-8 weeks for casting, assembly, and hand-painting."
        },
        {
            id: "item-4",
            title: "How much is shipping?",
            content: "Shipping depends heavily on the crate size, weight, and destination. We provide custom freight quotes for every order to ensure the best rate."
        },
        {
            id: "item-5",
            title: "Can I display these outdoors?",
            content: "Yes! Our resin is weather-resistant. However, for long-term outdoor display, we recommend a UV-protective clear coat every few years to preserve the paint finish."
        },
        {
            id: "item-6",
            title: "Do you offer installation services?",
            content: "For large skeleton mounts, we can recommend professional installation teams or provide detailed assembly guides for your local contractors."
        }
    ];

    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl space-y-12">
            <section className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold font-display text-primary">Frequently Asked Questions</h1>
                <p className="text-xl text-muted-foreground">
                    Answers to common questions about our products and services.
                </p>
            </section>

            <section className="bg-card rounded-2xl p-8 border shadow-sm">
                <SimpleAccordion items={faqs} />
            </section>
        </div>
    );
}
