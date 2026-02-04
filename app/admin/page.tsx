import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderTree, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { subDays } from 'date-fns';

async function getDashboardData() {
  const [
    productCount,
    newProductsCount,
    categoryCount,
    userCount,
    newUsersCount
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({
      where: {
        createdAt: {
          gte: subDays(new Date(), 30),
        },
      },
    }),
    prisma.category.count(),
    prisma.user.count({
      where: {
        role: { not: 'ADMIN' },
      },
    }),
    prisma.user.count({
      where: {
        role: { not: 'ADMIN' },
        createdAt: {
          gte: subDays(new Date(), 7),
        },
      },
    }),
  ]);

  return {
    productCount,
    newProductsCount,
    categoryCount,
    userCount,
    newUsersCount,
  };
}

export default async function AdminDashboard() {
  const {
    productCount,
    newProductsCount,
    categoryCount,
    userCount,
    newUsersCount,
  } = await getDashboardData();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-display text-primary">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/products">
          <Card className="hover:shadow-lg transition-all duration-300 border-none bg-white/80 backdrop-blur-sm shadow-md cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
              <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <Package className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display text-primary">{productCount}</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <span className="bg-green-100 px-1.5 py-0.5 rounded-full mr-2">+{newProductsCount}</span>
                last 30 days
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/categories">
          <Card className="hover:shadow-lg transition-all duration-300 border-none bg-white/80 backdrop-blur-sm shadow-md cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
              <div className="p-2 bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors">
                <FolderTree className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display text-primary">{categoryCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Active Collections</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/users">
          <Card className="hover:shadow-lg transition-all duration-300 border-none bg-white/80 backdrop-blur-sm shadow-md cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Users</CardTitle>
              <div className="p-2 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                <Users className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display text-primary">{userCount}</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <span className="bg-green-100 px-1.5 py-0.5 rounded-full mr-2">+{newUsersCount}</span>
                new this week
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/10 p-8 shadow-sm">
          <h3 className="font-bold font-display text-xl mb-4 text-primary">Quick Actions</h3>
          <p className="text-muted-foreground mb-6 text-sm">Manage your catalog, add new species, or update existing collections.</p>
          <div className="flex gap-4">
            <Button asChild className="shadow-md hover:shadow-lg transition-all rounded-full px-6">
              <Link href="/admin/products/new">Add New Product</Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-6 border-primary/20 hover:bg-primary/9">
              <Link href="/admin/categories/new">Create Category</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
