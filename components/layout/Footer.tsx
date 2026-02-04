"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) return null;

    return (
        <footer className="border-t bg-muted/40 text-muted-foreground">
            <div className="container mx-auto py-12 px-4 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold font-display text-primary">Dino Replica</h3>
                        <p className="text-sm leading-relaxed">
                            Museum equality dinosaur resin replicas. Hand-crafted, accurate, and durable.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Products</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/products?category=theropods" className="hover:text-primary">Theropods</Link></li>
                            <li><Link href="/products?category=sauropods" className="hover:text-primary">Sauropods</Link></li>
                            <li><Link href="/products?category=skulls" className="hover:text-primary">Skulls</Link></li>
                            <li><Link href="/products?category=skeletons" className="hover:text-primary">Skeletons</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary">Shipping Info</Link></li>
                            <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Email: info@dinoreplica.com</li>
                            <li>Phone: +1 800 DINO-REP</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm">
                    &copy; {new Date().getFullYear()} Dino Replica. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
