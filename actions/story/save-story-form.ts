"use server"

import { zfd } from "zod-form-data"
import { safeAction } from "@/modules/safe-action"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { actionResult } from "@/modules/actionResult"
import { v4 as uuidv4 } from "uuid"

const schema = zfd.formData({
	id: zfd.numeric(),
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	description: z.string().trim(),
})
export const saveStoryForm = safeAction(
	schema,
	async function ({ id, description, name }) {
		const { id: createdById } = await authorize(true)

		if (id) {
			await prisma.story.update({
				where: { id: id },
				data: { name, description },
			})
			return actionResult(true, "saved") // TODO localize
		} else {
			const story = await prisma.story.create({
				data: { description, name, uuid: uuidv4(), createdById },
			})
			return actionResult(
				true,
				"created", // TODO localize
				`/stories/${story.id}/detail`
			)
		}
	}
)
