"use client";

import { useRouter } from "next/navigation";

export default function JoinEvent({
    children,
    eventId,
}: {
    children: React.ReactNode;
    eventId: string;
}) {
    const { refresh } = useRouter();

    const join = async () => {
        const resp = await fetch(`/api/event/${eventId}/join`, {
            method: "post",
        });
        if (resp.ok && resp.status == 201) {
            refresh();
        }
    };

    return (
        <button
            className="w-full flex justify-center items-center bg-rose-600 p-2 rounded-md"
            onClick={join}
        >
            {children}
        </button>
    );
}
