export default function EventCard({
    id,
    title,
    description,
}: {
    id: string;
    title: string;
    description: string;
    organizationId: string;
}) {
    return (
        <li className="bg-emerald-400 text-white w-56 p-5 rounded-lg flex flex-col gap-4">
            <header>
                <h2>{title}</h2>
                <p>{description}</p>
            </header>
            <footer>
                <button className="w-full flex justify-center items-center bg-rose-600 p-2 rounded-md">
                    Join Activity
                </button>
            </footer>
        </li>
    );
}
