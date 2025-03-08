"use client"

import { saveStoryForm } from "@/actions/story/save-story-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormTextArea } from "@/components/form-textarea"

type StoryFormProps = {
	t: Record<"name" | "description", string>
	value: Record<"name" | "description" | "uuid", string>
}

export function StoryForm({ t, value }: StoryFormProps) {
	return (
		<Form action={saveStoryForm} autoSave>
			<input type="string" name="uuid" defaultValue={value.uuid} hidden />
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
