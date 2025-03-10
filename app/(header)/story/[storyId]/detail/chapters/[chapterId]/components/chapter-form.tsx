"use client"

import { saveChapterForm } from "@/actions/chapter/save-chapter-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormTextArea } from "@/components/form-textarea"

type ChapterFormProps = {
	t: Record<"name" | "description", string>
	value: { name: string; description: string; id: number; storyId: number }
}

export function ChapterForm({ t, value }: ChapterFormProps) {
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
