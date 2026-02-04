"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";

// Since Input/Label are not in UI folder per previous check, I will define them here or use HTML
// to match the previous file I saw (ReplyInquiryModal used raw HTML with classes).
// I will use raw HTML with classes for consistency and speed.

interface QuoteModalProps {
    product: {
        id: number;
        title: string;
        slug: string;
    };
    trigger?: React.ReactNode;
}

export function QuoteModal({ product, trigger }: QuoteModalProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            productId: product.id,
            userName: formData.get('userName'),
            userEmail: formData.get('userEmail'),
            company: formData.get('company'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            country: formData.get('country'),
            zip: formData.get('zip'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setSuccess(true);
                // Optional: Close after a delay or let user close
                setTimeout(() => {
                    setOpen(false);
                    setSuccess(false);
                }, 3000);
            } else {
                alert("Failed to send inquiry. Please try again.");
            }
        } catch (e) {
            console.error(e);
            alert("Error sending inquiry");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {trigger || <Button size="lg">Request Price</Button>}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl text-primary">Inquiry Sent!</DialogTitle>
                        <DialogDescription className="text-center pt-4">
                            Thank you for your interest in the <strong>{product.title}</strong>. <br />
                            We have received your request and will get back to you with a formal quote and shipping estimate shortly.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                            <Send className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button size="lg">Request Price</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Request Price & Freight Quote</DialogTitle>
                    <DialogDescription>
                        Complete the form below to receive a custom quote for the <strong>{product.title}</strong> including shipping to your location.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="userName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Name *
                            </label>
                            <input
                                id="userName"
                                name="userName"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="userEmail" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email *
                            </label>
                            <input
                                id="userEmail"
                                name="userEmail"
                                type="email"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="company" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Company
                            </label>
                            <input
                                id="company"
                                name="company"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Phone
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="address" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Address (for shipping estimate)
                        </label>
                        <input
                            id="address"
                            name="address"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="grid gap-2 col-span-2 md:col-span-2">
                            <label htmlFor="city" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                City
                            </label>
                            <input
                                id="city"
                                name="city"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="country" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Country
                            </label>
                            <input
                                id="country"
                                name="country"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="zip" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Zip / Postal
                            </label>
                            <input
                                id="zip"
                                name="zip"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Message / Special Requirements
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="I'm interested in..."
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="submit" size="lg" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {!loading && <Send className="mr-2 h-4 w-4" />}
                            Submit Inquiry
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
