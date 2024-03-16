import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import JoinActivity from "./JoinActivity";

export default async function ActivityCard({
    id,
    title,
    description,
    joined,
    canJoin,
}: {
    id: string;
    title: string;
    description: string;
    organizationId: string;
    joined: boolean;
    canJoin: boolean;
}) {
    const session = await getServerAuthSession();

    return (
        <li className="bg-sky-400 text-white w-56 p-5 rounded-lg flex flex-col gap-4">
            <header className="space-y-1">
                <h2 className="text-lg">{title}</h2>
                <p className="text-sm">{description}</p>
            </header>
            <footer>
                {!canJoin ? (
                    <span className="text-slate-200 text-xs">
                        You need to join the Organization
                    </span>
                ) : (
                    <>
                        {joined ? (
                            <span className="text-slate-200 text-xs">
                                You are part of this Activity
                            </span>
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
                    </>
                )}
            </footer>
        </li>
    );
}
