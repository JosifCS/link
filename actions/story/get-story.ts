"use server"

import prisma from "@/lib/prisma"

export type GetStoryQuery = Awaited<ReturnType<typeof getStory>>

export async function getStory(storyId: number) {
	return prisma.story.findFirst({
		where: { id: storyId },
	})
}
