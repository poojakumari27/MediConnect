import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  try {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    // Try finding the user in our own database
    const existingUser = await db.user.findUnique({
      where: {
        clerkUserId: clerkUser.id,
      },
      include: {
        transactions: {
          where: {
            type: "CREDIT_PURCHASE",
            createdAt: {
              gte: startOfMonth,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (existingUser) return existingUser;

    // If not found, create a new user in our DB
    const newUser = await db.user.create({
      data: {
        clerkUserId: clerkUser.id,
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
        imageUrl: clerkUser.imageUrl,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        transactions: {
          create: {
            type: "CREDIT_PURCHASE",
            packageId: "free_user",
            amount: 0,
          },
        },
      },
    });

    return newUser;
  } catch (error) {
    console.error(" checkUser error:", error);
    return null;
  }
};
