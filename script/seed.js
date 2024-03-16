// seeds.js

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    try {
        // Create organizations
        const organization1 = await prisma.organization.create({
            data: {
                name: "Organization 1",
                description: "Description for Organization 1",
                category: "Category 1",
            },
        });

        const organization2 = await prisma.organization.create({
            data: {
                name: "Organization 2",
                description: "Description for Organization 2",
                category: "Category 2",
            },
        });

        // Create activities
        const activity1 = await prisma.activity.create({
            data: {
                title: "Activity 1",
                description: "Description for Activity 1",
                organizationId: organization1.id,
            },
        });

        const activity2 = await prisma.activity.create({
            data: {
                title: "Activity 2",
                description: "Description for Activity 2",
                organizationId: organization2.id,
            },
        });

        // Create events
        const event1 = await prisma.event.create({
            data: {
                title: "Event 1",
                description: "Description for Event 1",
                organizationId: organization1.id,
            },
        });

        const event2 = await prisma.event.create({
            data: {
                title: "Event 2",
                description: "Description for Event 2",
                organizationId: organization2.id,
            },
        });

        // Create users
        const user1 = await prisma.user.create({
            data: {
                username: "user1",
                email: "user1@example.com",
                password: "password1",
                admin: false,
            },
        });

        const user2 = await prisma.user.create({
            data: {
                username: "user2",
                email: "user2@example.com",
                password: "password2",
                admin: true,
            },
        });

        console.log("Seed data created successfully!");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
