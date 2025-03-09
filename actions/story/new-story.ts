"use server"

import { v4 as uuidv4 } from "uuid"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function newStory(/*email?: string*/) {
	const { uuid } = await prisma.story.create({
		data: {
			description: "",
			name: "New story",
			uuid: uuidv4(),
			//createdByEmail: email,
		},
		select: { uuid: true },
	})

	redirect(`/stories/${uuid}`)
}
