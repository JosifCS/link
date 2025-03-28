"use server"

import { zfd } from "zod-form-data"
import { safeAction } from "@/modules/safe-action"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"
import { actionResult } from "@/modules/actionResult"

const schema = zfd.formData({
	id: zfd.numeric(),
	dialogId: zfd.numeric(),
	text: z
		.string()
		.min(2, { message: "Text must be at least 2 characters long." })
		.trim(),
	answer: zfd.repeatableOfType(z.string()).optional(),
	prevOption: zfd.numeric().optional(),
	nextSentence: zfd.repeatableOfType(z.string()).optional(),
})
export const saveSentenceForm = safeAction(
	schema,
	async function ({ id, dialogId, text, answer, nextSentence, prevOption }) {
		await authorize(true)

		if (id) {
			await prisma.sentence.update({
				where: { id: id },
				data: {
					dialogId,
					text,
					options: {
						deleteMany: {},
						create: answer?.map((x, i) => {
							const n = +(nextSentence?.at(i) ?? "")
							return { text: x, nextId: n ? n : null }
						}),
					},
					nextOptions: {
						set: [],
						connect: prevOption ? [{ id: prevOption }] : [],
					},
				},
			})
			return actionResult(true, "saved") // TODO localize
		} else {
			const sentence = await prisma.sentence.create({
				data: { text, dialogId },
				select: {
					id: true,
					dialogId: true,
					dialog: {
						select: {
							chapterId: true,
							chapter: { select: { storyId: true } },
						},
					},
				},
			})

			return actionResult(
				`/stories/${sentence.dialog.chapter.storyId}/chapters/${sentence.dialog.chapterId}/${sentence.dialogId}/${sentence.id}`,
				"created"
			) // TODO localize
		}
	}
)
