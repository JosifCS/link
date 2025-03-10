"use server"

import { v4 as uuidv4 } from "uuid"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { authorize } from "@/modules/auth"
import { cookies } from "next/headers"

export async function newStory() {
	const user = await authorize(true)

	const { uuid, id } = await prisma.story.create({
		data: {
			description: "",
			name: "New story",
			uuid: uuidv4(),
			createdById: user.id,
		},
		select: { uuid: true, id: true },
	})

	// nepřihlášenému uživateli se do cookies na sedm dní uloží uuid právě vytvořeného příběhu
	if (user.id == null) {
		const c = await cookies()
		c.set("story", uuid, { maxAge: 60 * 60 * 24 * 7 })
	}

	redirect(`/story/${id}/detail`)
}
