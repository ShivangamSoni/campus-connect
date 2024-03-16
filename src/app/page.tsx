import UserOrganizations from "@/components/UserOrganizations";
import { prisma } from "@/db/connect";
import { getServerAuthSession } from "@/server/auth";
import { getJoinedOrganizations } from "@/server/organizations/getJoinedOrganizations";
import Link from "next/link";

export default async function Home() {
    const session = await getServerAuthSession();
    let organizations = await prisma.organization.findMany({});

    if (session && session?.user) {
        const joinedOrganizations = await getJoinedOrganizations({
            id: session.user.id as string,
        });
        organizations = organizations.filter(
            (org) =>
                joinedOrganizations.findIndex((jOrg) => jOrg.id == org.id) == -1
        );
    }
    return (
        <main>
            <section className="space-oy-3">
                <h1 className="font-medium text-slate-700 text-2xl underline">
                    Available Organizations
                </h1>
                <ul>
                    <li>
                        {organizations.map(({ id, name }) => (
                            <li key={id}>
                                <Link href={`/organization/${id}`}>{name}</Link>
                            </li>
                        ))}
                    </li>
                </ul>
            </section>

            {session && session.user && (
                <UserOrganizations id={session.user.id as string} />
            )}
        </main>
    );
}
