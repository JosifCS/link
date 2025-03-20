"use server"

import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"

export type GetSentencesQuery = Awaited<ReturnType<typeof getSentences>>

export async function getSentences(dialogId: number) {
	// await authorize(storyId)

	return await prisma.sentence.findMany({
		where: { dialogId: { equals: dialogId } },
		select: {
			id: true,
			text: true,
			options: {
				select: {
					text: true,
				},
			},
		},
	})
}
