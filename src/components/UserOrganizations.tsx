import { prisma } from "@/db/connect";
import { getJoinedOrganizations } from "@/server/organizations/getJoinedOrganizations";
import Link from "next/link";

export default async function UserOrganizations({ id }: { id: string }) {
    const joinedOrganizations = await getJoinedOrganizations({ id });
    return (
        <section className="space-y-3">
            <h1 className="font-medium text-slate-700 text-2xl underline">
                Your Organizations
            </h1>

            {joinedOrganizations.length == 0 ? (
                <h2>You haven&apos;t Joined any Organizations</h2>
            ) : (
                <ul>
                    <li>
                        {joinedOrganizations.map(({ id, name }) => (
                            <li key={id}>
                                <Link href={`/organization/${id}`}>{name}</Link>
                            </li>
                        ))}
                    </li>
                </ul>
            )}
        </section>
    );
}
