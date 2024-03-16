import ActivityCard from "@/components/ActivityCard";
import EventCard from "@/components/EventCard";
import { prisma } from "@/db/connect";

export default async function page({ params }: { params: { id: string } }) {
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

    const a = events[0];

    return (
        <main className="space-y-6 p-6">
            <div className="space-y-2">
                <h1 className="text-4xl">{organization?.name}</h1>
                <p className="text-xl">{organization?.description}</p>
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
