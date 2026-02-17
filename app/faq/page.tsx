import { SimpleAccordion } from '@/components/ui/accordion';

export default function FAQPage() {
    const faqs = [
        {
            id: "item-1",
            title: "Durability",
            content: "All our replicas are manufactured from a durable high quality polyester resin, hand painted and fully reinforced with fiberglass. Some have a metal structure inside for anchoring. The ideal environment is indoors. If you display outdoors you will have to maintain them and should periodically reapply a clear protective coat, which should be tested first on an inconspicuous part of the casting. We recommend you keep them under cover and indoors. However, these products all receive a final clear coat in the factory, but all clear finishes will eventually deteriorate in full sun or freezing winters. Freezing moisture like rain or melting snow will damage the exterior immediately. We strongly suggest that in extremely inclement weather and freezing temperatures that you store your statues indoors or cover them. Water based acrylic outdoor paints are mostly used on our products. If used outdoors and especially in full sun or freezing winters for any extended period, you should be prepared to undertake some maintenance to the finishes. Any protection from the sun, even the shade of a tree, will significantly reduce fading and other wear to the paint surfaces. In windy environments, statues should be secured to permanent structures. These products will last indefinitely if used indoors; the use of the products is beyond our control, no warranties are offered or implied."
        },
        {
            id: "item-2",
            title: "What are your products made of?",
            content: "Most of our items are made of polyester resin, reinforced with fiberglass for additional strength. To create a high quality finish we work with additives like stone and marble powders, metal powders (iron, bronze, aluminum and copper), and color pigments. In other cases we use superior paints like polyurethane, automotive lacquers, and acrylics."
        },
        {
            id: "item-3",
            title: "What are the advantages of working with resin?",
            content: "Resin (fiberglass) is a very versatile medium and is used in many different industries. Water tanks and cool boxes are commonly made of resin. But even speed boats and luxury yachts are constructed with fiberglass. Since resin is applied in molds, the shape and form of the end product is always consistent."
        },
        {
            id: "item-4",
            title: "How are your products made?",
            content: "All our products are completely made by hand and most are made with the aid of a mold; the mold contains a hollow cavity in the desired shape and is filled with resin, fiberglass and hardeners. This mixture hardens after which a solid shape can be ejected from the mold. After exhaustive sanding, each product is painted by hand by our skillful artists."
        },
        {
            id: "item-5",
            title: "Are your products designed for outdoors?",
            content: "In most cases resin is perfectly suitable for outdoors because heat, frost and rain have little or no influence on this material. Some finishes, like our Roman Stone, will last \"forever\", require very minimal maintenance, and their overall appearance will only improve when exposed to rain and sunlight. However, not all our products can be exposed to the elements and therefore some items are recommended for indoor use only. Most products are suitable for Indoors as well as Outdoors. If using outdoors, weatherizing your item with a sealer will help to keep your item looking its best for longer. We strongly recommend bringing in or providing covering for your statue during the harsh winter months. In freezing temperatures, water that accumulates in the crevice of the statues may cause cracking due to expanding and contracting. Measurements are Approximate. All animals are Imported and made of a Durable Resin or Fiberglass. Since products are Hand Painted each one has their own unique characteristics and can vary slightly from the pictures."
        },
        {
            id: "item-6",
            title: "How are the items packed?",
            content: "Each item is individually packed in a polybag and carefully placed in a double density carton box with extra cushions and inserts for additional protection. Large items in odd shapes (like our dinosaurs for example) are packed in carton wraps to save space in the container. Our heavy roman stone and concrete items are packed in wooden crates for easy transportation and handling as well as for added protection. Other packaging requirements are possible as well like drop test packaging or additional prints on the box."
        }
    ];

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl space-y-12">
            <section className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold font-display text-primary uppercase tracking-tight">FAQ</h1>
                <p className="text-xl text-muted-foreground">
                    Common questions about materials, care, and shipping.
                </p>
            </section>

            <section className="bg-card rounded-2xl p-8 border shadow-sm">
                <SimpleAccordion items={faqs} />
            </section>
        </div>
    );
}
