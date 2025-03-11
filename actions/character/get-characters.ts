"use server"

import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"

export type GetCharactersQuery = Awaited<ReturnType<typeof getCharacters>>

export async function getCharacters(storyId: number) {
	await authorize(storyId)

	return prisma.character.findMany({
		where: { storyId: { equals: storyId } },
	})
}
