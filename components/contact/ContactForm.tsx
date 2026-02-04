'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle } from 'lucide-react';

export function ContactForm() {
    const searchParams = useSearchParams();
    const productSlug = searchParams.get('product');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to submit inquiry');
            setSuccess(true);
        } catch (err) {
            setError('Something went wrong. Please try again or contact us directly via email.');
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="text-center py-12 space-y-4">
                <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold font-display text-primary">Request Received!</h2>
                <p className="text-muted-foreground">
                    Thank you for your inquiry. We will calculate the shipping costs and get back to you shortly.
                </p>
                <Button onClick={() => setSuccess(false)} variant="outline">
                    Send Another Request
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <input type="hidden" name="productId" value="" /> {/* We'd need to lookup ID if we want to link explicitly, but slug in message is fine for now if simpler */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Name *</label>
                    <input name="userName" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <input type="email" name="userEmail" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="email@example.com" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Company (Optional)</label>
                    <input name="company" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <input type="tel" name="phone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <input
                    name="subject" // Not in DB Schema directly but useful for context, maybe append to message
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue={productSlug ? `Quote Request: ${productSlug}` : 'General Inquiry'}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Message & Shipping Address *</label>
                <textarea
                    name="message"
                    required
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Please include your full shipping address (City, Country, Zip) for an accurate freight quote."
                    defaultValue={productSlug ? `I would like to request a shipping quote for the ${productSlug} to the following address:\n\n` : ''}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Destination Country *</label>
                <input name="country" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="e.g. USA, Germany, Australia" />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Message
            </Button>
        </form>
    );
}
