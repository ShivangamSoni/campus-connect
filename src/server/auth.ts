import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userService } from "./services/userService";
import { prisma } from "@/db/connect";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && account.type === "credentials") {
                token.userId = account.providerAccountId;
            }
            return token;
        },
        async session({ session, token, user }) {
            // @ts-expect-error
            session.user = await prisma.user.findFirst({
                where: {
                    id: token.userId,
                },
            });
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                return userService.authenticate(email, password);
            },
        }),
    ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
