import { prisma } from "@/db/connect";

export async function getJoinedOrganizations({ id }: { id: string }) {
    const memberships = await prisma.organizationMembership.findMany({
        where: {
            userId: id,
        },
        include: {
            organization: true,
        },
    });
    return memberships.map((mem) => mem.organization);
}
