import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPath = nextUrl.pathname.startsWith('/admin');

            if (isAdminPath) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user && token.role) {
                session.user.role = token.role as string;
            }
            return session;
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
