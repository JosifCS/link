"use server"

import { v4 as uuidv4 } from "uuid"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { authorize } from "@/modules/auth"

export async function newStory() {
	const { id } = await authorize(false)

	const { uuid } = await prisma.story.create({
		data: {
			description: "",
			name: "New story",
			uuid: uuidv4(),
			createdById: id,
		},
		select: { uuid: true },
	})

	redirect(`/stories/${uuid}`)
}
