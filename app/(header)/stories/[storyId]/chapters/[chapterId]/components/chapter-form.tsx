"use client"

import { getChapter, GetChapterQuery } from "@/actions/chapter/get-chapter"
import { saveChapterForm } from "@/actions/chapter/save-chapter-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormTextArea } from "@/components/form-textarea"
import { useEffect, useState } from "react"

export type ChapterFormProps = {
	t: Record<"name" | "description", string>
	chapterId: number
}

export function ChapterForm({ t, chapterId }: ChapterFormProps) {
	const [value, setValue] = useState<GetChapterQuery>()

	useEffect(() => {
		getChapter(chapterId).then(setValue)
	}, [chapterId])

	if (value == undefined) return "No data"

	return (
		<Form action={saveChapterForm} autoSave>
			<input type="number" name="id" defaultValue={value.id} hidden />
			<input
				type="number"
				name="storyId"
				defaultValue={value.storyId}
				hidden
			/>
			<FormInput
				type="text"
				name="name"
				label={t.name}
				defaultValue={value.name}
			/>
			<FormTextArea
				name="description"
				label={t.description}
				defaultValue={value.description}
				rows={3}
			/>
		</Form>
	)
}
