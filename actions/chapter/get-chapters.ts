"use server"

import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"

export type GetChaptersQuery = Awaited<ReturnType<typeof getChapters>>

export async function getChapters(storyId: number) {
	await authorize(storyId)

	return prisma.chapter.findMany({
		where: { storyId: { equals: storyId } },
	})
}
