"use server";

import prisma from "@/lib/prisma";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default async function MailingListPage() {
    const subscribers = await prisma.mailingList.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-display text-primary">Mailing List</h1>
                <div className="text-sm text-muted-foreground">
                    Total Subscribers: {subscribers.length}
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Subscribed At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subscribers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center h-24 text-muted-foreground">
                                    No subscribers found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            subscribers.map((subscriber) => (
                                <TableRow key={subscriber.id}>
                                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                                    <TableCell>{format(subscriber.createdAt, "PPP p")}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
