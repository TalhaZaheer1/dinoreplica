import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EmailRequestButton } from '@/components/products/EmailRequestButton';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
}

type Product = {
  id: number;
  title: string;
  slug: string;
  model: string;
  price: number | string | any; // Decimal type from Prisma
  category: Category | null;
  images: any;
}

async function getCategories(): Promise<Category[]> {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

async function getProducts(categorySlug?: string | string[]): Promise<Product[]> {
  const where: any = { isVisible: true };

  if (categorySlug && typeof categorySlug === 'string') {
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug }
    });
    if (category) {
      where.categoryId = category.id;
    }
  }

  return await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { title: 'asc' },
  }) as unknown as Product[]; // Type assertion for Decimal handling
}

export default async function ProductsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = resolvedSearchParams.category;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(categorySlug)
  ]);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar Filter */}
        <aside className="w-full md:w-64 space-y-8">
          <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
            <h3 className="text-lg font-bold font-display text-primary mb-4 border-b border-border/50 pb-2">Collections</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/products"
                  className={cn(
                    "block px-4 py-2.5 rounded-lg transition-all text-sm font-medium",
                    !categorySlug ? "bg-primary text-white shadow-md" : "hover:bg-white hover:shadow-sm text-muted-foreground hover:text-foreground"
                  )}
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg transition-all text-sm font-medium",
                      categorySlug === cat.slug ? "bg-primary text-white shadow-md" : "hover:bg-white hover:shadow-sm text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-display text-primary">
              {categorySlug
                ? categories.find(c => c.slug === categorySlug)?.name || 'Products'
                : 'All Products'}
            </h1>
            <p className="text-muted-foreground mt-2">
              Showing {products.length} results
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-lg">
              <p className="text-xl text-muted-foreground">No products found in this category.</p>
              <Button asChild className="mt-4" variant="outline">
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-border/40 hover:border-primary/20">
                  <div className="relative h-72 overflow-hidden bg-stone-100">
                    {(() => {
                      const images = Array.isArray(product.images) ? product.images : [];
                      const mainImage = images.length > 0 ? (images[0] as string) : null;

                      if (mainImage) {
                        return (
                          <Image
                            src={mainImage}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        );
                      } else {
                        return (
                          <div className="absolute inset-0 flex items-center justify-center text-5xl text-stone-300">
                            🦖
                          </div>
                        );
                      }
                    })()}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex-1">
                      {product.category && (
                        <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                          {product.category.name}
                        </p>
                      )}
                      <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                        <Link href={`/products/${product.slug}`} className="before:absolute before:inset-0">
                          {product.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.model}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between relative z-10">
                      <span className="text-xl font-bold text-secondary">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <EmailRequestButton
                          productName={product.title}
                          productModel={product.model}
                          size="sm"
                          variant="secondary"
                        >
                          Request Quote
                        </EmailRequestButton>
                        <Link href={`/products/${product.slug}`} className="text-sm font-semibold text-primary group-hover:underline">
                          Details &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
