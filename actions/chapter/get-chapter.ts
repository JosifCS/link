"use server"

import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"

export type GetChapterQuery = Awaited<ReturnType<typeof getChapter>>

export async function getChapter(chapterId: number) {
	//await authorize(storyId)

	return await prisma.chapter.findFirst({
		where: { id: { equals: chapterId } },
	})
}
