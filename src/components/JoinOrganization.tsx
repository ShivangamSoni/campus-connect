"use client";

import { useRouter } from "next/navigation";

export default function JoinOrganization({
    children,
    orgId,
}: {
    children: React.ReactNode;
    orgId: string;
}) {
    const { refresh } = useRouter();

    const join = async () => {
        const resp = await fetch(`/api/organization/${orgId}/join`, {
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
