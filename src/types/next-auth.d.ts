import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "./user";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId: string;
    }
}
