import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import JoinButton from "./JoinOrganization";

export default async function ActivityCard({
    id,
    title,
    description,
}: {
    id: string;
    title: string;
    description: string;
    organizationId: string;
}) {
    const session = await getServerAuthSession();
    const join = async () => {};

    return (
        <li className="bg-sky-400 text-white w-56 p-5 rounded-lg flex flex-col gap-4">
            <header>
                <h2>{title}</h2>
                <p>{description}</p>
            </header>
            <footer>
                {session?.user ? (
                    "Join BTN"
                ) : (
                    // <JoinButton onClick={join}>Join Activity</JoinButton>
                    <Link
                        href="/login"
                        className="w-full flex justify-center items-center bg-rose-600 p-2 rounded-md"
                    >
                        Login to Join
                    </Link>
                )}
            </footer>
        </li>
    );
}
