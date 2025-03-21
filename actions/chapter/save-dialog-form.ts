"use server"

import { zfd } from "zod-form-data"
import { safeAction } from "@/modules/safe-action"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { actionResult } from "@/modules/actionResult"

const schema = zfd.formData({
	id: zfd.numeric(),
	chapterId: zfd.numeric(),
	characterId: zfd.numeric(),
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	description: z.string().trim(),
})
export const saveDialogForm = safeAction(
	schema,
	async function ({ id, chapterId, description, name, characterId }) {
		await authorize(true)

		if (id) {
			await prisma.dialog.update({
				where: { id: id },
				data: { name, description, characterId },
			})
			return actionResult(true, "saved") // TODO localize
		} else {
			const dialog = await prisma.dialog.create({
				data: { name, description, chapterId, characterId },
				select: {
					id: true,
					chapterId: true,
					chapter: { select: { storyId: true } },
				},
			})

			return actionResult(
				`/stories/${dialog.chapter.storyId}/chapters/${dialog.chapterId}/${dialog.id}`,
				"created"
			) // TODO localize
		}
	}
)
