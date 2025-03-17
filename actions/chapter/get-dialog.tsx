"use server"

import prisma from "@/lib/prisma"
import { authorize } from "@/modules/auth"

export type GetDialogQuery = Awaited<ReturnType<typeof getDialog>>

export async function getDialog(dialogId: number) {
	// await authorize(storyId)

	return await prisma.dialog.findFirst({
		where: { id: { equals: dialogId } },
	})
}
