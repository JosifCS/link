"use server"

import { zfd } from "zod-form-data"
import { safeAction } from "@/modules/safe-action"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { actionResult } from "@/modules/actionResult"

const schema = zfd.formData({
	id: zfd.numeric(),
	storyId: zfd.numeric(),
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	description: z.string().trim(),
})
export const saveCharacterForm = safeAction(
	schema,
	async function ({ id, storyId, description, name }) {
		await authorize(true)

		if (id) {
			await prisma.character.update({
				where: { id: id },
				data: { name, description },
			})
			return actionResult(true, "saved") // TODO localize
		} else {
			const character = await prisma.character.create({
				data: { name, description, storyId },
			})
			return actionResult(
				true,
				"created", // TODO localize
				`/stories/${character.storyId}/characters/${character.id}`
			)
		}
	}
)
