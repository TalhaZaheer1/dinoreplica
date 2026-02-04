"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, FolderTree, Users, LayoutDashboard, LogOut, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
        { href: "/admin/products", label: "Products", icon: Package },
        { href: "/admin/categories", label: "Categories", icon: FolderTree },
        { href: "/admin/mailing-list", label: "Mailing List", icon: Mail },
        { href: "/admin/users", label: "Users", icon: Users },
    ];

    const isActive = (href: string, exact: boolean = false) => {
        if (exact) return pathname === href;
        return pathname?.startsWith(href);
    };

    return (
        <aside className="w-64 bg-card hidden md:flex flex-col fixed inset-y-0 text-card-foreground border-r">
            <div className="h-16 flex items-center px-6 border-b border-b-slate-100">
                <span className="text-xl font-bold font-display text-primary">Dino Admin</span>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const active = isActive(link.href, link.exact);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                active
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted text-foreground/80 hover:text-foreground"
                            )}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => signOut({ callbackUrl: '/login' })}
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </aside>
    );
}
