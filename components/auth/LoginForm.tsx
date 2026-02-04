'use client';

import { useActionState, useEffect, useState } from 'react';
import { authenticate } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'; // Added icons
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
    const searchParams = useSearchParams();
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );
    const [urlError, setUrlError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const error = searchParams.get('error');
        if (error === 'CredentialsSignin') {
            setUrlError('Invalid email or password.');
        } else if (error) {
            setUrlError('An error occurred. Please try again.');
        }

        if (searchParams.get('registered') === 'true') {
            setSuccessMessage('Account created successfully. Please log in.');
        }
    }, [searchParams]);

    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="admin@example.com"
                    required
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    id="password"
                    type="password"
                    name="password"
                    required
                    minLength={6}
                />
            </div>

            <div
                aria-live="polite"
                aria-atomic="true"
            >
                {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-600 rounded-md p-3 text-sm flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{successMessage}</span>
                    </div>
                )}
                {(errorMessage || urlError) && (
                    <div className="bg-destructive/15 border border-destructive/30 text-destructive rounded-md p-3 text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errorMessage || urlError}</span>
                    </div>
                )}
            </div>

            <Button className="w-full" aria-disabled={isPending} disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log in
            </Button>
        </form>
    );
}
