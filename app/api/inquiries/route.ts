import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const inquiries = await prisma.inquiry.findMany({
            include: { product: true },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(inquiries);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            userEmail, userName, message, productId,
            company, phone, address, city, country, zip
        } = body;

        // Validate required fields
        if (!userEmail || !userName) {
            return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
        }

        const inquiry = await prisma.inquiry.create({
            data: {
                userEmail,
                userName,
                message,
                company,
                phone,
                address,
                city,
                country,
                zip,
                productId: productId ? parseInt(productId) : null,
            },
        });

        // Here we would typically send an email notification using Nodemailer
        // await sendInquiryEmail(inquiry);

        return NextResponse.json(inquiry);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
    }
}
