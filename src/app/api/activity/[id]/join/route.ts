import { prisma } from "@/db/connect";
import { getServerAuthSession } from "@/server/auth";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerAuthSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: "You Need to Login" },
                { status: 401 }
            );
        }

        const activityId = params.id;
        const userId = session.user.id as string;

        const existingMembership = await prisma.activityMembership.findFirst({
            where: {
                userId,
                activityId,
            },
        });

        if (existingMembership) {
            return NextResponse.json(
                { message: "You are already a member of this organization" },
                { status: 400 }
            );
        }

        await prisma.activityMembership.create({
            data: {
                user: { connect: { id: userId } },
                activity: { connect: { id: activityId } },
            },
        });

        return NextResponse.json(
            { message: "Joined Successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server error" }, { status: 501 });
    }
}
