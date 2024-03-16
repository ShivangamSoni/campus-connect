import { prisma } from "@/db/connect";

export const userService = {
    authenticate,
};

async function authenticate(email: string, password: string) {
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    });

    if (!user) {
        return null;
    }

    if (user.password !== password) {
        return null;
    }

    return user;
}
