import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { ReplyInquiryModal } from "@/components/admin/ReplyInquiryModal";
import { InquiryDetailsModal } from "@/components/admin/InquiryDetailsModal";

async function getInquiries() {
    return await prisma.inquiry.findMany({
        include: { product: true },
        orderBy: { createdAt: 'desc' },
    });
}

export default async function AdminInquiriesPage() {
    const inquiries = await getInquiries();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-display text-primary">Inquiries</h1>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inquiries.map((inquiry: any) => (
                            <TableRow key={inquiry.id}>
                                <TableCell className="text-muted-foreground text-xs">
                                    {/* {format(inquiry.createdAt, 'PP')} // Need date-fns */}
                                    {new Date(inquiry.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{inquiry.userName}</div>
                                    <div className="text-xs text-muted-foreground">{inquiry.userEmail}</div>
                                </TableCell>
                                <TableCell>
                                    {inquiry.product ? (
                                        <Link href={`/admin/products/${inquiry.product.id}/edit`} className="hover:underline">
                                            {inquiry.product.title}
                                        </Link>
                                    ) : (
                                        <span className="text-muted-foreground">General Inquiry</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={inquiry.status === 'PENDING' ? 'default' : 'secondary'}>
                                        {inquiry.status}
                                    </Badge>
                                    {inquiry.repliedAt && (
                                        <div className="text-[10px] text-muted-foreground mt-1">
                                            Replied: {new Date(inquiry.repliedAt).toLocaleDateString()}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <InquiryDetailsModal inquiry={inquiry} />
                                        {inquiry.status !== 'ARCHIVED' && (
                                            <ReplyInquiryModal inquiry={inquiry} />
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
