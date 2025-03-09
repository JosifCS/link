"use server"

import { v4 as uuidv4 } from "uuid"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { auth0 } from "@/lib/auth0"

export async function newStory() {
	const session = await auth0.getSession()

	const { uuid } = await prisma.story.create({
		data: {
			description: "",
			name: "New story",
			uuid: uuidv4(),
			createdByEmail: session?.user.email,
		},
		select: { uuid: true },
	})

	redirect(`/stories/${uuid}`)
}
