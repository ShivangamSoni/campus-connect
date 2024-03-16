import { prisma } from "@/db/connect";
import Link from "next/link";

export default async function Home() {
    const organizations = await prisma.organization.findMany({});

    return (
        <main>
            <nav>
                <ul className="flex gap-3 p-2">
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                    <li>
                        <Link href="/sign-up">Sign Up</Link>
                    </li>
                    <li>
                        <Link href="/organization/65f52b2b1005fb8ca3470134/activity">
                            Activity
                        </Link>
                    </li>
                </ul>

                <ul>
                    <li>
                        {organizations.map(({ id, name }) => (
                            <li key={id}>
                                <Link href={`/organization/${id}`}>{name}</Link>
                            </li>
                        ))}
                    </li>
                </ul>
            </nav>
        </main>
    );
}
