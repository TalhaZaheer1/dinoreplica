import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash, EyeOff } from 'lucide-react';
import { DeleteButton } from '../components/DeleteButton';
import { deleteProduct } from '@/lib/actions';

async function getProducts() {
  return await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-display text-primary">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-mono text-xs">{product.model}</TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.category?.name || '-'}</TableCell>
                <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                <TableCell>
                  {!product.isVisible && (
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                      <EyeOff className="mr-1 h-3 w-3" /> Hidden
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" asChild className='hover:bg-primary'>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteButton id={product.id} action={deleteProduct} itemName="product" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
