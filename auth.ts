import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Prisma from "@/lib/prisma"
import { compare } from "bcryptjs"
import { z } from "zod"
import { authConfig } from "./auth.config"

async function getUser(email: string) {
    try {
        const user = await Prisma.user.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    const passwordsMatch = await compare(password, user.password);
                    if (passwordsMatch) {
                        return {
                            ...user,
                            id: user.id.toString(), // NextAuth requires ID to be a string
                            role: user.role // Ensure role is passed
                        };
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
})
