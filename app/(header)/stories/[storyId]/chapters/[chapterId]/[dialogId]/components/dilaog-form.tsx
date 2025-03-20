import { getDialog } from "@/actions/chapter/get-dialog"
import { saveChapterForm } from "@/actions/chapter/save-chapter-form"
import { saveDialogForm } from "@/actions/chapter/save-dialog-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormSelect } from "@/components/form-select"
import { FormSkeleton } from "@/components/form-skeleton"
import { FormTextArea } from "@/components/form-textarea"
import prisma from "@/lib/prisma"
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

	const characters = await prisma.character.findMany({
		select: { id: true, name: true },
	})

	return (
		<Form
			action={saveDialogForm}
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
			/>
			<FormTextArea
				type="text"
				name="description"
				label={t("description")}
				defaultValue={value?.description}
			/>
			<FormSelect
				name="characterId"
				label={t("character")}
				options={characters.map((x) => ({
					value: x.id.toString(),
					label: x.name,
				}))}
				defaultValue={value?.characterId.toString()}
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
