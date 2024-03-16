import { prisma } from "@/db/connect";

export default async function UserOrganizations({ id }: { id: string }) {
    const myOrganizations = await prisma.user.findFirst({
        where: {
            id,
        },
        include: {
            Membership: true,
        },
    });

    return (
        <section className="space-y-3">
            <h1 className="font-medium text-slate-700 text-2xl underline">
                Your Organizations
            </h1>
            <ul>
                {/* <li>
                    {organizations.map(({ id, name }) => (
                        <li key={id}>
                            <Link href={`/organization/${id}`}>{name}</Link>
                        </li>
                    ))}
                </li> */}
            </ul>
        </section>
    );
}
