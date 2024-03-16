import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import JoinActivity from "./JoinActivity";

export default async function ActivityCard({
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
        <li className="bg-sky-400 text-white w-56 p-5 rounded-lg flex flex-col gap-4">
            <header>
                <h2>{title}</h2>
                <p>{description}</p>
            </header>
            <footer>
                {joined ? (
                    <span>You are part of this Activity</span>
                ) : (
                    <>
                        {session?.user ? (
                            <JoinActivity activityId={id}>
                                Join Activity
                            </JoinActivity>
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
