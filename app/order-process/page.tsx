import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Truck, CreditCard, FileText, Globe, DollarSign } from 'lucide-react';

export default function OrderProcessPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-16">
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-primary uppercase tracking-tight">Order Process</h1>
        <p className="text-xl text-muted-foreground">
          A guide to acquiring museum-quality replicas for your institution or collection.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Institutional Orders */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-primary/5 p-6 border-b border-border">
            <h2 className="text-2xl font-bold font-display text-primary flex items-center gap-3">
              <Globe className="h-6 w-6" />
              Institutions & Businesses
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              For Zoos, Museums, Parks, Amusement Parks, Public or Private Businesses.
            </p>
          </div>
          <div className="p-8 space-y-6">
            <ol className="space-y-4 list-decimal list-inside marker:text-primary marker:font-bold">
              <li className="pl-2"><span className="font-medium">Request Quote:</span> Email me your information and the items you want a quote on.</li>
              <li className="pl-2"><span className="font-medium">Receive Quote:</span> I will send you a quote calculating Freight and Crating if needed.</li>
              <li className="pl-2"><span className="font-medium">Purchase Order:</span> If you decide to purchase, provide a P.O. or written order.</li>
              <li className="pl-2"><span className="font-medium">Shipping:</span> I will ship. Large Dinosaurs and Animals are delivered by me.</li>
              <li className="pl-2"><span className="font-medium">Payment Terms:</span> Net 10 days after arrival and inspection. If I deliver personally, a check is desired upon delivery.</li>
            </ol>
          </div>
        </div>

        {/* Individual Orders */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-secondary/5 p-6 border-b border-border">
            <h2 className="text-2xl font-bold font-display text-primary flex items-center gap-3">
              <UserIcon className="h-6 w-6" />
              Individuals
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              For private collectors and individual buyers.
            </p>
          </div>
          <div className="p-8 space-y-6">
            <ol className="space-y-4 list-decimal list-inside marker:text-primary marker:font-bold">
              <li className="pl-2"><span className="font-medium">Contact:</span> Email me your information.</li>
              <li className="pl-2"><span className="font-medium">Receive Quote:</span> I will send a quote including freight and crating if needed.</li>
              <li className="pl-2"><span className="font-medium">Approval:</span> If you decide to purchase, send me an approval email.</li>
              <li className="pl-2"><span className="font-medium">Payment Link:</span> I will send you a link to pay by Visa or Mastercard.</li>
              <li className="pl-2"><span className="font-medium">Large Orders:</span> For orders over $5,000, I will provide banking details for a wire transfer or address for a cashier's check.</li>
              <li className="pl-2"><span className="font-medium">Shipping:</span> Large Dinosaurs and Animals are delivered by me.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Full Container Loads */}
      <section className="bg-stone-900 text-stone-100 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Truck className="w-64 h-64" />
        </div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl font-bold font-display text-accent border-b border-accent/20 pb-4 inline-block">
            Full Container Loads
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Ordering & Pricing
              </h3>
              <p className="text-stone-300 leading-relaxed">
                Email me the items wanted. Minimums are <strong>30 CBM for a 20' container</strong> or <strong>70 CBM for a 40' container</strong>.
                You can use the price order form to figure the CBM - download it, mark the items, and send it to me. I will then send the discounted cost back.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-accent" />
                Payment & Delivery (USA)
              </h3>
              <ul className="space-y-2 text-stone-300 list-disc list-inside">
                <li>$2,000 upfront when ordered.</li>
                <li>$10,000 when ready to load on the ship.</li>
                <li>Volume discounts are large; you pay ocean freight.</li>
                <li>I check for damage when it arrives at your facility.</li>
              </ul>
            </div>
            <div className="space-y-4 md:col-span-2 border-t border-white/10 pt-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-accent" />
                International Orders (Non-USA)
              </h3>
              <p className="text-stone-300 leading-relaxed">
                Require $10,000 to order, $10,000 before loading. I will manage unload, inventory, and inspect for damages upon arrival. Balance plus freight due via check.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purchasing Guide */}
      <section className="max-w-4xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-8 md:p-10 space-y-6">
        <h2 className="text-3xl font-bold font-display text-primary text-center">Purchasing Guide</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {[
            "ALL ITEMS ARE PRICED WITHOUT FREIGHT. Tax will apply if applicable.",
            "Stock Items will be shipped immediately.",
            "All items are made to order. Manufactured in the Philippines.",
            "Some animals are in two pieces for ease of shipping and to reduce breakage.",
            "Manufacturing timing is usually 6 to 8 weeks from order date.",
            "Shipping takes 4 to 5 weeks to get to Ft. Worth, Texas.",
            "Crating charge applies for items requiring special wood crating.",
            "Some items can go USPS or UPS. Some require special packaging.",
            "Larger items need to be hauled on flatbed trailer, shipping quoted per animal.",
            "Full container orders (20' or 40') can be shipped directly to you with a large discount."
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="text-primary font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact Footer */}
      <div className="text-center space-y-6 border-t border-border pt-12">
        <div className="inline-block p-6 bg-white rounded-2xl shadow-sm border border-border/50">
          <h3 className="text-2xl font-bold font-display text-foreground mb-4">Contact Information</h3>
          <div className="space-y-2 text-lg">
            <p className="font-bold text-primary">Karl Walker</p>
            <p>6308 Garwin Dr.</p>
            <p>Fort Worth, Texas 76132-5054</p>
            <p className="font-medium">Mobile: 817-703-1619</p>
            <a href="mailto:dinosaurresinreplica@gmail.com" className="text-accent hover:underline block mt-2 font-bold">
              dinosaurresinreplica@gmail.com
            </a>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="mailto:dinosaurresinreplica@gmail.com">
                <Mail className="mr-2 h-4 w-4" /> Email Me
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">
                View Catalog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
