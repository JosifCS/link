"use client"

import { saveCharacterForm } from "@/actions/character/save-character-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormTextArea } from "@/components/form-textarea"

type CharacterFormProps = {
	t: Record<"name" | "description", string>
	value: { name: string; description: string; id: number; storyId: number }
}

export function CharacterForm({ t, value }: CharacterFormProps) {
	return (
		<Form action={saveCharacterForm} autoSave>
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
