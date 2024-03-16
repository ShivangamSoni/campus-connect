import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import JoinEvent from "./JoinEvent";

export default async function EventCard({
    id,
    title,
    description,
    joined,
}: {
    id: string;
    title: string;
    description: string;
    organizationId: string;
    joined?: boolean;
}) {
    const session = await getServerAuthSession();

    return (
        <li className="bg-emerald-400 text-white w-56 p-5 rounded-lg flex flex-col gap-4">
            <header>
                <h2>{title}</h2>
                <p>{description}</p>
            </header>
            <footer>
                {joined ? (
                    <span>You are part of this Event</span>
                ) : (
                    <>
                        {session?.user ? (
                            <JoinEvent eventId={id}>Join Event</JoinEvent>
                        ) : (
                            <Link
                                href="/login"
                                className="w-full flex justify-center items-center bg-rose-600 p-2 rounded-md"
                            >
                                Login to Join
                            </Link>
                        )}
                    </>
                )}
            </footer>
        </li>
    );
}
