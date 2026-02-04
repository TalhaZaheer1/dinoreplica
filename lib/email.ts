import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    if (!process.env.EMAIL_SERVER_HOST) {
        console.warn("Email credentials not set. Mocking email send.");
        console.log(`[Mock Email] To: ${to}, Subject: ${subject}`);
        return;
    }

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
    });
}
