import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Activity Management App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} m-auto max-w-5xl p-4`}>
                <header className="flex flex-row justify-between items-center p-2">
                    <h1>
                        <Link href="\">Campus Connect</Link>
                    </h1>
                    <Navigation />
                </header>
                {children}
            </body>
        </html>
    );
}
