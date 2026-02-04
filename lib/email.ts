export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    console.log(`[Mock Email] To: ${to}, Subject: ${subject}`);
    console.log(`[Mock Content]: ${html.substring(0, 100)}...`);
    return Promise.resolve();
}
