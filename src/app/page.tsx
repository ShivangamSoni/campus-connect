import { prisma } from "@/db/connect";
import Link from "next/link";

export default async function Home() {
    const organizations = await prisma.organization.findMany({});

    return (
        <main>
            <section className="space-y-3">
                <h1 className="font-medium text-slate-700 text-2xl underline">
                    Available Organizations
                </h1>
                <ul>
                    <li>
                        {organizations.map(({ id, name }) => (
                            <li key={id}>
                                <Link href={`/organization/${id}`}>{name}</Link>
                            </li>
                        ))}
                    </li>
                </ul>
            </section>
        </main>
    );
}
