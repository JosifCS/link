"use server"

import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"

export type GetDialogsQuery = Awaited<ReturnType<typeof getDialogs>>

export async function getDialogs(chapterId: number) {
	// await authorize(storyId)

	return await prisma.dialog.findMany({
		where: { chapterId: { equals: chapterId } },
		select: {
			name: true,
			id: true,
			_count: { select: { sentences: true } },
			character: { select: { name: true } },
		},
	})
}
