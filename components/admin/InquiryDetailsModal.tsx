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
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Assuming these exist, otherwise I'll use native select
import { Loader2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

// Define type based on Prisma model
type InquiryFull = {
    id: number;
    userName: string;
    userEmail: string;
    company?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    country?: string | null;
    zip?: string | null;
    message?: string | null;
    status: string; // 'PENDING' | 'REPLIED' | 'ARCHIVED'
    product?: { title: string } | null;
    createdAt: string | Date;
    repliedAt?: string | Date | null;
};

export function InquiryDetailsModal({ inquiry }: { inquiry: InquiryFull }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(inquiry.status);
    const router = useRouter();

    const handleStatusChange = async (newStatus: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/inquiries/${inquiry.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setStatus(newStatus);
                router.refresh();
            } else {
                alert("Failed to update status");
            }
        } catch (e) {
            console.error(e);
            alert("Error updating status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" title="View Details">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-between items-start pr-8">
                        <div>
                            <DialogTitle>Inquiry Details</DialogTitle>
                            <DialogDescription>
                                Received on {new Date(inquiry.createdAt).toLocaleDateString()} at {new Date(inquiry.createdAt).toLocaleTimeString()}
                            </DialogDescription>
                        </div>
                        <Badge variant={status === 'PENDING' ? 'default' : status === 'ARCHIVED' ? 'secondary' : 'outline'}>
                            {status}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Customer Info */}
                    <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Customer</h4>
                            <p className="font-medium">{inquiry.userName}</p>
                            <p className="text-sm">{inquiry.userEmail}</p>
                            {inquiry.company && <p className="text-sm text-muted-foreground">{inquiry.company}</p>}
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Contact / Location</h4>
                            {inquiry.phone && <p className="text-sm">Ph: {inquiry.phone}</p>}
                            <div className="text-sm mt-1">
                                {inquiry.address && <div>{inquiry.address}</div>}
                                <div>
                                    {[inquiry.city, inquiry.zip, inquiry.country].filter(Boolean).join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product & Message */}
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Interested Product</h4>
                            <p className="font-medium text-lg">{inquiry.product?.title || 'General Inquiry'}</p>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-md">
                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Message</h4>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{inquiry.message || "No message provided."}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-card border rounded-lg p-4 flex items-center justify-between gap-4">
                        <div className="text-sm font-medium">Update Status:</div>
                        <div className="flex items-center gap-2">
                            {/* Simple Native Select for robustness if UI component missing */}
                            <select
                                className="h-9 w-[180px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                disabled={loading}
                            >
                                <option value="PENDING">PENDING</option>
                                <option value="REPLIED">REPLIED</option>
                                <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-between">
                    <div className="text-xs text-muted-foreground self-center">
                        ID: #{inquiry.id}
                    </div>
                    <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
