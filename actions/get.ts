"use server"

import prisma from "@/lib/prisma"

export type GetStoryQuery = NonNullable<Awaited<ReturnType<typeof getStory>>>

/**
 *
 * @param uuid
 * @returns `GetStoryQuery`
 */
export async function getStory(uuid: string) {
	return await prisma.story.findFirst({
		where: { uuid: { equals: uuid } },
		include: {
			chapters: {
				include: { dialogs: { include: { character: true } } },
			},
			characters: {
				include: { dialogs: { include: { chapter: true } } },
			},
		},
	})
}
