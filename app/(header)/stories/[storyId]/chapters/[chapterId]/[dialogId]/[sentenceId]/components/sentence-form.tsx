import { saveSentenceForm } from "@/actions/chapter/save-sentence-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormSkeleton } from "@/components/form-skeleton"
import prisma from "@/lib/prisma"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { SentenceOptions } from "./sentence-options"

export type SentenceFormProps = {
	dialogId: number
	sentenceId: number
}

export async function SentenceForm({
	dialogId,
	sentenceId,
}: SentenceFormProps) {
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Dialog.Sentence.Components"
	)

	const sentence =
		sentenceId == 0
			? {
					id: 0,
					text: "",
					dialogId,
					options: [],
				}
			: await prisma.sentence.findFirst({
					where: { id: { equals: sentenceId } },
					select: {
						id: true,
						text: true,
						dialogId: true,
						options: {
							select: {
								id: true,
								nextId: true,
								text: true,
							},
						},
					},
				})

	if (sentence == null) notFound()

	const selectOptions = await (
		await prisma.sentence.findMany()
	).map((x) => ({ label: x.text, value: x.id.toString() }))

	return (
		<Form
			action={saveSentenceForm}
			autoSave={(sentence?.id ?? 0) > 0}
			submitLabel={t("SentenceForm.createSentence")}
		>
			<input type="number" name="id" defaultValue={sentence.id} hidden />
			<input
				type="number"
				name="dialogId"
				defaultValue={sentence.dialogId}
				hidden
			/>
			<FormInput
				type="text"
				name="text"
				label={t("SentenceForm.text")}
				defaultValue={sentence.text}
			/>

			<SentenceOptions
				defaultValue={sentence.options}
				selectOptions={selectOptions}
				t={{
					answers: t("SentenceOptions.answers"),
					answer: t("SentenceOptions.answer"),
					noAnswers: t("SentenceOptions.noAnswers"),
					addAnswer: t("SentenceOptions.addAnswer"),
					nextSentence: t("SentenceOptions.nextSentence"),
					removeAnswer: t("SentenceOptions.removeAnswer"),
				}}
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
