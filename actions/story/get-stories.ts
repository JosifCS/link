"use server"

import prisma from "@/lib/prisma"

export type GetStoriesQuery = Awaited<ReturnType<typeof getStories>>

export async function getStories(email: string) {
	return prisma.story.findMany({
		where: { createdByEmail: { equals: email } },
	})
}
