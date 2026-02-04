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

// Define simpler types to avoid heavy Prisma imports in client component
type InquiryPartial = {
    id: number;
    userName: string;
    userEmail: string;
    product?: { title: string } | null;
};

export function ReplyInquiryModal({ inquiry }: { inquiry: InquiryPartial }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            inquiryId: inquiry.id,
            subject: formData.get('subject'),
            freightQuote: formData.get('freightQuote'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/inquiries/reply', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setOpen(false);
                router.refresh();
            } else {
                alert("Failed to send reply"); // Simple error handling for MVP
            }
        } catch (e) {
            console.error(e);
            alert("Error sending reply");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Reply</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reply to Inquiry</DialogTitle>
                    <DialogDescription>
                        Send a quote to {inquiry.userName} ({inquiry.userEmail}).
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSend} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="subject" className="text-right text-sm font-medium">
                            Subject
                        </label>
                        <input
                            id="subject"
                            name="subject"
                            defaultValue={`Re: Inquiry for ${inquiry.product?.title || 'Replica'}`}
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="freightQuote" className="text-right text-sm font-medium">
                            Freight ($)
                        </label>
                        <input
                            id="freightQuote"
                            name="freightQuote"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <label htmlFor="message" className="text-right text-sm font-medium mt-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            className="col-span-3 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Details about availability, crate dimensions, etc..."
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {!loading && <Send className="mr-2 h-4 w-4" />}
                            Send Quote
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
