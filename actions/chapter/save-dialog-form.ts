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
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	description: z.string().trim(),
})
export const saveDialogForm = safeAction(
	schema,
	async function ({ id, chapterId, description, name }) {
		await authorize(true)

		if (id) {
			await prisma.dialog.update({
				where: { id: id },
				data: { name, description },
			})
			return actionResult(true, "saved") // TODO localize
		} else {
			const chapter = await prisma.dialog.create({
				data: { name, description, chapterId, characterId: 0 },
			})

			return actionResult(
				true,
				"created" // TODO localize
			)
		}
	}
)
