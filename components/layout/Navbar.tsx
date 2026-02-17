"use client";

import Link from 'next/link';
// import { usePathname } from 'next/navigation'; // Removing to switch to server component logic or handle differently if needed. 
// Actually this is a client component ('use client') so I can't use `auth()` directly easily without passing it down or using SessionProvider.
// However, I can make a wrapper or just fetch session in a server component layout and pass it.
// BUT, the easiest way for this "Navbar" which seems to be client-side (usePathname) is to use `useSession` OR make it a Server Component and put the interactive parts in client components.
// The file has "use client" at top.
// Let's refactor: Navbar structure is:
// RootLayout -> Navbar.
// I'll assume I can use `useSession` from `next-auth/react` if I had a provider, OR I can fetch session in `RootLayout` and pass it to Navbar.
// Let's check `app/layout.tsx`. It imports Navbar.
// I will change Navbar to accept `user` as prop, and fetch session in RootLayout (Server Component).

import { NavSearch } from './NavSearch';
import { Button } from '@/components/ui/button';
import { UserNav } from './UserNav';
import { usePathname } from 'next/navigation';
import { SubscribeButton } from './SubscribeButton';

export function Navbar({ user }: { user?: any }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const session = { user }; // Mock session object structure for minimal refactor


  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold font-display text-primary">Dino Replica</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Products
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
            About Us
          </Link>
          <Link href="/deals" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Deals
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Contact
          </Link>
          <Link href="/catalog" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Catalog
          </Link>
          <Link href="/order-process" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Order Process
          </Link>
          <Link href="/shipping" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Shipping
          </Link>

        </nav>
        <div className="flex items-center gap-4">
          <NavSearch />

          {session?.user ? (
            <>
              <SubscribeButton userEmail={session.user.email} />
              <UserNav user={session.user} />
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
