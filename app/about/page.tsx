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
                    At Dino Replica, we are dedicated to bringing the grandeur of the Mesozoic Era to museums, educational institutions, and private collectors worldwide.
                </p>
            </section>

            {/* Story Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl border border-border/50">
                    <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-6xl opacity-20 select-none">
                        🦖
                    </div>
                    {/* <Image src="/workshop.jpg" alt="Our Workshop" fill className="object-cover" /> */}
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold font-display text-primary">Master Craftsmanship</h2>
                    <div className="prose prose-lg text-muted-foreground">
                        <p>
                            Founded by a team of paleontologists and master sculptors, our mission is to create the most scientifically accurate dinosaur replicas available.
                        </p>
                        <p>
                            Each piece starts with a study of original fossil records. Our artists then meticulously sculpt every scale, feather, and bone texture before casting in high-grade, durable resin.
                        </p>
                        <p>
                            The result is a museum-quality piece that captures the imagination and stands the test of time.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Button asChild size="lg" className="rounded-full">
                            <Link href="/products">View Our Collection</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-stone-100 rounded-3xl p-12 text-center space-y-12">
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
            </section>
        </div>
    );
}
