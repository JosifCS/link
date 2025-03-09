"use server"

import { zfd } from "zod-form-data"
import { safeAction } from "@/modules/safe-action"
import { z } from "zod"
import prisma from "@/lib/prisma"

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
		await prisma.story.update({
			where: { id: id },
			data: { name, description },
		})

		return {
			success: true,
			message: "ok",
			//redirect: `/`,
		}
	}
)
