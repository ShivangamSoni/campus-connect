import { prisma } from "@/db/connect";

export async function getJoinedActivities({ id }: { id: string }) {
    const memberships = await prisma.activityMembership.findMany({
        where: {
            userId: id,
        },
        include: {
            activity: true,
        },
    });
    return memberships.map((mem) => mem.activity);
}
