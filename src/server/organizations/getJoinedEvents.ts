import { prisma } from "@/db/connect";

export async function getJoinedEvents({ id }: { id: string }) {
    const memberships = await prisma.eventMembership.findMany({
        where: {
            userId: id,
        },
        include: {
            event: true,
        },
    });
    return memberships.map((mem) => mem.event);
}
