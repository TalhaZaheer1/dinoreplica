import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';


type Category = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
}

async function getCategories(): Promise<Category[]> {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/OIP-385978661.jpg"
            alt="Dinosaur Hero"
            fill
            className="object-cover transition-transform duration-1000 scale-105"
            priority
          />
          {/* Gradient Overlay for modern look and readability */}
        </div>

        <div className="relative z-10 max-w-5xl px-4 space-y-8 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-5">
          <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent border border-accent/50 text-sm font-semibold tracking-wider font-mono mb-2 backdrop-blur-sm">
            MUSEUM QUALITY REPLICAS
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter font-display text-white drop-shadow-2xl">
            Prehistoric Masterpieces
          </h1>
          <p className="text-xl md:text-2xl text-stone-200/90 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Bring the Mesozoic Era to your collection with scientifically accurate resin fossil replicas.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-primary/50 hover:-translate-y-1"
            >
              Explore Collection
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-1"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 font-display text-primary">
            Our Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative h-[400px] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
                    <span className="text-stone-300 text-6xl opacity-20 group-hover:scale-110 transition-transform duration-700">🦖</span>
                  </div>
                )}

                {/* Gradient Overlay - Smooth fade from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content - Bottom Aligned */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display tracking-tight group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <div className="h-0.5 w-12 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-3" />
                  <p className="text-stone-300 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                    Explore collection &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Excerpt */}
      <section className="py-20 bg-background">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl rotate-1 hover:rotate-0 transition-transform">
            <Image
              src="/about-us.png"
              alt="About Us"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold font-display text-primary">About Dino Replica</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We specialize in creating scientifically accurate, museum-grade resin replicas of dinosaur fossils.
              From the fearsome T-Rex to the majestic Sauropods, our craftsmen pay attention to every detail
              to bring prehistoric history to life.
            </p>
            <Link href="/about" className="text-secondary font-bold hover:underline">
              Read Our Story &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
