import ActivityCard from "@/components/ActivityCard";
import EventCard from "@/components/EventCard";
import JoinOrganization from "@/components/JoinOrganization";
import { prisma } from "@/db/connect";
import { getServerAuthSession } from "@/server/auth";
import { getJoinedActivities } from "@/server/organizations/getJoinedActivities";
import { getJoinedEvents } from "@/server/organizations/getJoinedEvents";
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
        (await prisma.organizationMembership.findFirst({
            where: {
                userId: session.user.id as string,
                organizationId: params.id,
            },
        }));

    const myActivities =
        session && session.user
            ? await getJoinedActivities({ id: session.user.id as string })
            : [];

    const myEvents =
        session && session.user
            ? await getJoinedEvents({ id: session.user.id as string })
            : [];

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
                        <ActivityCard
                            key={activity.id}
                            joined={
                                myActivities.findIndex(
                                    (act) => act.id == activity.id
                                ) != -1
                            }
                            {...activity}
                        />
                    ))}
                </ul>
            </section>

            <section>
                <h2>Events</h2>

                <ul className="flex flex-wrap gap-2">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            joined={
                                myEvents.findIndex(
                                    (evt) => evt.id == event.id
                                ) != -1
                            }
                            {...event}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}
