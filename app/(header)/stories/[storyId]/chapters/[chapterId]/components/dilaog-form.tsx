"use client"

import { getDialog, GetDialogQuery } from "@/actions/chapter/get-dialog"
import { saveChapterForm } from "@/actions/chapter/save-chapter-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormTextArea } from "@/components/form-textarea"
import { useEffect, useState } from "react"

export type DialogFormProps = {
	t: Record<"name" | "description", string>
	dialogId: number
	chapterId: number
}

export function DialogForm({ t, dialogId, chapterId }: DialogFormProps) {
	const [value, setValue] = useState<GetDialogQuery>()

	useEffect(() => {
		if (dialogId == 0)
			setValue({
				name: "",
				id: 0,
				chapterId,
				characterId: 0,
				description: "",
			})
		else getDialog(dialogId).then(setValue)
	}, [dialogId])

	return (
		<Form action={saveChapterForm} autoSave>
			<input type="number" name="id" defaultValue={value?.id} hidden />
			<input
				type="number"
				name="chapterId"
				defaultValue={value?.chapterId}
				hidden
			/>
			<FormInput
				type="text"
				name="name"
				label={t.name}
				defaultValue={value?.name}
				skeleton={value == undefined}
			/>
			Selekt character
		</Form>
	)
}
