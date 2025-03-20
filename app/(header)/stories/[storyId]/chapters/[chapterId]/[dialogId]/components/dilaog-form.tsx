import { getDialog } from "@/actions/chapter/get-dialog"
import { saveChapterForm } from "@/actions/chapter/save-chapter-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormSkeleton } from "@/components/form-skeleton"
import { FormTextArea } from "@/components/form-textarea"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

export type DialogFormProps = {
	dialogId: number
	chapterId: number
}

export async function DialogForm({ dialogId, chapterId }: DialogFormProps) {
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Dialog.Components.DialogForm"
	)

	const value =
		dialogId == 0
			? {
					name: "",
					id: 0,
					chapterId,
					characterId: 0,
					description: "",
				}
			: await getDialog(dialogId)

	if (value == null) notFound()

	return (
		<Form
			action={saveChapterForm}
			autoSave={(value?.id ?? 0) > 0}
			submitLabel={t("createDialog")}
		>
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
				label={t("name")}
				defaultValue={value?.name}
				skeleton={value == undefined}
			/>
			<FormTextArea
				type="text"
				name="name"
				label={t("description")}
				defaultValue={value?.description}
				skeleton={value == undefined}
			/>
			<FormInput
				type="text"
				name="name"
				label={t("character")}
				defaultValue={value?.characterId}
				skeleton={value == undefined}
			/>
		</Form>
	)
}

export async function DialogFormSkeleton() {
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Dialog.Components.DialogForm"
	)

	return (
		<FormSkeleton>
			<FormInput label={t("name")} skeleton />
			<FormTextArea label={t("description")} skeleton />
			<FormInput label={t("character")} skeleton />
		</FormSkeleton>
	)
}
