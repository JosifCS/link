"use server"

import prisma from "@/lib/prisma"

export type GetStoriesQuery = Awaited<ReturnType<typeof getStories>>

export async function getStories(userId: number) {
	return prisma.story.findMany({
		where: { createdById: { equals: userId } },
	})
}
