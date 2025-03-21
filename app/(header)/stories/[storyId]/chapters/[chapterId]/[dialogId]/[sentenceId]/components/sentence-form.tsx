import { saveSentenceForm } from "@/actions/chapter/save-sentence-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormSkeleton } from "@/components/form-skeleton"
import prisma from "@/lib/prisma"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

export type SentenceFormProps = {
	dialogId: number
	sentenceId: number
}

export async function SentenceForm({
	dialogId,
	sentenceId,
}: SentenceFormProps) {
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Dialog.Sentence.Components.SentenceForm"
	)

	const value =
		sentenceId == 0
			? {
					id: 0,
					text: "",
					dialogId,
				}
			: await prisma.sentence.findFirst({
					where: { id: { equals: sentenceId } },
				})

	if (value == null) notFound()

	const characters = await prisma.character.findMany({
		select: { id: true, name: true },
	})

	return (
		<Form
			action={saveSentenceForm}
			autoSave={(value?.id ?? 0) > 0}
			submitLabel={t("createSentence")}
		>
			<input type="number" name="id" defaultValue={value.id} hidden />
			<input
				type="number"
				name="dialogId"
				defaultValue={value.dialogId}
				hidden
			/>
			<FormInput
				type="text"
				name="text"
				label={t("text")}
				defaultValue={value.text}
			/>
		</Form>
	)
}

export async function SentenceFormSkeleton() {
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Dialog.Sentence.Components.SentenceForm"
	)

	return (
		<FormSkeleton>
			<FormInput label={t("text")} skeleton />
		</FormSkeleton>
	)
}
