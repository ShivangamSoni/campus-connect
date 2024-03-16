import ActivityCard from "@/components/ActivityCard";
import EventCard from "@/components/EventCard";
import JoinOrganization from "@/components/JoinOrganization";
import { prisma } from "@/db/connect";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function page({ params }: { params: { id: string } }) {
    const session = await getServerAuthSession();

    const organization = await prisma.organization.findFirst({
        where: { id: params.id },
    });

    const activites = await prisma.activity.findMany({
        where: {
            organizationId: params.id,
        },
    });

    const events = await prisma.event.findMany({
        where: {
            organizationId: params.id,
        },
    });

    const existingMembership =
        session?.user &&
        (await prisma.membership.findFirst({
            where: {
                userId: session.user.id as string,
                organizationId: params.id,
            },
        }));

    return (
        <main className="space-y-6 p-6">
            <div className="space-y-2">
                <h1 className="text-4xl">{organization?.name}</h1>
                <p className="text-xl">{organization?.description}</p>

                {session?.user ? (
                    <>
                        {existingMembership == null ? (
                            <JoinOrganization orgId={params.id}>
                                Join Organization
                            </JoinOrganization>
                        ) : (
                            <span>You&apos;re a Member</span>
                        )}
                    </>
                ) : (
                    <Link
                        href="/login"
                        className="w-full flex justify-center items-center bg-rose-600 p-2 rounded-md"
                    >
                        Login to Join
                    </Link>
                )}
            </div>

            <section>
                <h2>Activities</h2>

                <ul className="flex flex-wrap gap-2">
                    {activites.map((activity) => (
                        <ActivityCard key={activity.id} {...activity} />
                    ))}
                </ul>
            </section>

            <section>
                <h2>Events</h2>

                <ul className="flex flex-wrap gap-2">
                    {events.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </ul>
            </section>
        </main>
    );
}
