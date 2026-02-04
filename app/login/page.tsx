import LoginForm from '@/components/auth/LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md border">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold font-display text-primary">Dino Replica</h1>
                    <p className="text-sm text-muted-foreground">Admin Access</p>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
