import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from './components/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') redirect('/login');

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <header className="h-16 border-b bg-background/95 px-6 flex items-center justify-between md:hidden sticky top-0 z-10">
          <span className="font-bold">Dino Admin</span>
          {/* Mobile placeholder */}
        </header>
        <div className="p-6 md:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
