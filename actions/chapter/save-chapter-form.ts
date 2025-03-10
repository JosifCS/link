"use server"

import { zfd } from "zod-form-data"
import { safeAction } from "@/modules/safe-action"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { actionResponse } from "@/modules/actionResponse"

const schema = zfd.formData({
	id: zfd.numeric(),
	storyId: zfd.numeric(),
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	description: z.string().trim(),
})
export const saveChapterForm = safeAction(
	schema,
	async function ({ id, storyId, description, name }) {
		await authorize(true)

		if (id) {
			await prisma.chapter.update({
				where: { id: id },
				data: { name, description },
			})
			return actionResponse(true, "saved") // TODO localize
		} else {
			const chapter = await prisma.chapter.create({
				data: { name, description, storyId },
			})

			return actionResponse(
				true,
				"created", // TODO localize
				`/story/${chapter.storyId}/chapter/${chapter.id}`
			)
		}
	}
)
