import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

export default function CatalogPage() {
    return (
        <div className="container mx-auto py-12 px-4 space-y-12 max-w-4xl">
            <section className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold font-display text-primary">Digital Catalog</h1>
                <p className="text-xl text-muted-foreground">
                    Download our full 2026 specimen catalog in high-resolution PDF format.
                </p>
            </section>

            <div className="bg-stone-900 text-stone-50 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <h2 className="text-3xl font-bold font-display">2026 Collection</h2>
                    <p className="text-stone-300 leading-relaxed">
                        Our comprehensive catalog features over 500 pages of high-resolution images, detailed scientific descriptions, and technical specifications for every replica in our archive.
                    </p>
                    <ul className="space-y-2 text-stone-400">
                        <li className="flex items-center gap-2 justify-center md:justify-start">
                            <FileText className="h-4 w-4" /> Full Color Photography
                        </li>
                        <li className="flex items-center gap-2 justify-center md:justify-start">
                            <FileText className="h-4 w-4" /> Dimensions & Weights
                        </li>
                        <li className="flex items-center gap-2 justify-center md:justify-start">
                            <FileText className="h-4 w-4" /> Installation Diagrams
                        </li>
                    </ul>
                    <div className="pt-4">
                        {/* Mock download link */}
                        <Button size="lg" className="rounded-full gap-2 w-full md:w-auto" asChild>
                            <a href="#" className="pointer-events-none opacity-80" aria-disabled="true">
                                <Download className="h-4 w-4" />
                                Download PDF (54 MB)
                            </a>
                        </Button>
                        <p className="text-xs text-stone-500 mt-2">* Login required for wholesale pricing.</p>
                    </div>
                </div>

                {/* Cover Preview */}
                <div className="w-64 aspect-[3/4] bg-stone-800 rounded-lg shadow-2xl relative rotate-3 border border-stone-700 flex items-center justify-center">
                    <div className="text-center space-y-2">
                        <span className="text-6xl">🦖</span>
                        <h3 className="font-display font-bold text-xl uppercase tracking-widest text-primary">Dino<br />Replica</h3>
                        <p className="text-stone-500 text-sm">2026 Catalog</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
