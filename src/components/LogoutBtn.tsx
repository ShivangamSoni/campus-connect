"use client";

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
    const handleLogout = async () => {
        await signOut();
    };

    return (
        <button
            className="font-medium mt-2 text-blue-600 hover:underline"
            onClick={handleLogout}
        >
            Log out
        </button>
    );
}
