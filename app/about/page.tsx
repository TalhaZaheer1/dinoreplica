import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold font-display text-primary">Preserving History</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We are a retail agent for a manufacturer of hand-made Decor, Animals, Furniture, Human figures, and collectable art. The Products are mainly produced out of polyester resin, reinforced with fiberglass and specialize in life-size and bigger-than-life figurines of all sorts. Our quality of detail, finishing and our designs are surpassed by none. Our Products are Hand-Crafted Treasures, Fashioned by Skilled Artists. Utilizing the Finest Materials Available (Durable Resin Fiberglass, Woods, Metals and Poly-Resins), and then Delicately Hand-Painted to Perfection. Theme Decors like the Egyptian and Roman Artifacts, Christmas Collection and Cherubs and Fairies have unique designs that will enhance the popularity of any Zoo, Theme Park or interior of any Home and Commercial Establishment. We ship our products all over the U.S.A. Our whole collection of products are on our website, we can also send you a CD-ROM by mail.
        </p>
      </section>

      {/* Story Section */}
      <section className="flex items-center justify-center">
        <div className="pt-4">
          <Button asChild size="lg" className="mx-auto rounded-full">
            <Link href="/products">View Our Collection</Link>
          </Button>
        </div>
      </section >

      {/* Values Section */}
      < section className="bg-stone-100 rounded-3xl p-12 text-center space-y-12" >
        <h2 className="text-3xl font-bold font-display text-primary">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm text-2xl">🔬</div>
            <h3 className="text-xl font-bold">Scientific Accuracy</h3>
            <p className="text-muted-foreground">We collaborate with experts to ensure every detail reflects current paleontological understanding.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm text-2xl">🎨</div>
            <h3 className="text-xl font-bold">Artistic Excellence</h3>
            <p className="text-muted-foreground">Hand-painted finishes that mimic fossilization or lifelike appearance with stunning realism.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm text-2xl">🏛️</div>
            <h3 className="text-xl font-bold">Museum Quality</h3>
            <p className="text-muted-foreground">Durable materials built for public display, interaction, and long-term preservation.</p>
          </div>
        </div>
      </section >
    </div >
  );
}
