import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

export default async function Navigation() {
    const authSession = await getServerAuthSession();

    return (
        <nav>
            <ul className="flex gap-4 p-4 justify-end items-center">
                {!authSession?.user ? (
                    <>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                        {/* <li>
                            <Link href="/sign-up">Sign Up</Link>
                        </li> */}
                    </>
                ) : (
                    <li className="flex flex-col items-end justify-end">
                        <h3 className="font-medium mt-2">
                            Logged In as:{" "}
                            <span className="font-bold">
                                {authSession.user.username}
                            </span>
                        </h3>
                        <LogoutBtn />
                    </li>
                )}
            </ul>
        </nav>
    );
}
