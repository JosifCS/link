import { saveSentenceForm } from "@/actions/chapter/save-sentence-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormSkeleton } from "@/components/form-skeleton"
import prisma from "@/lib/prisma"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { SentenceOptions } from "./sentence-options"
import { SentenceSelect } from "./sentence-select"
import { Label } from "@radix-ui/react-dropdown-menu"
import { PrevSelect } from "./prev-select"

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
					nextOptions: [],
				}
			: await prisma.sentence.findFirst({
					where: { id: { equals: sentenceId } },
					select: {
						id: true,
						text: true,
						dialogId: true,
						nextOptions: { select: { id: true } },
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

	const nextSentenceOptions = await (
		await prisma.sentence.findMany()
	).map((x) => ({ label: x.text, value: x.id.toString() }))

	const prevOptionOptions = await prisma.sentenceOption.findMany({
		select: {
			id: true,
			nextId: true,
			sentence: { select: { text: true, id: true } },
			text: true,
		},
	})

	return (
		<Form
			action={saveSentenceForm}
			autoSave={(sentence?.id ?? 0) > 0}
			submitLabel={t("SentenceForm.createSentence")}
			className="min-h-0"
		>
			<input type="number" name="id" defaultValue={sentence.id} hidden />
			<input
				type="number"
				name="dialogId"
				defaultValue={sentence.dialogId}
				hidden
			/>
			{+sentenceId != 0 && (
				<div className="flex gap-2 items-end">
					<PrevSelect
						defaultValue={
							sentence.nextOptions.at(0)?.id?.toString() ?? "0"
						}
						name={`prevOption`}
						selectOptions={prevOptionOptions}
						t={{
							prevOption: t("SentenceOptions.prevOption"),
							goToSentence: t("SentenceOptions.goToSentence"),
						}}
					/>
				</div>
			)}
			<FormInput
				type="text"
				name="text"
				label={t("SentenceForm.text")}
				defaultValue={sentence.text}
			/>
			{+sentenceId != 0 && (
				<SentenceOptions
					defaultValue={sentence.options}
					selectOptions={nextSentenceOptions}
					t={{
						answers: t("SentenceOptions.answers"),
						answer: t("SentenceOptions.answer"),
						noAnswers: t("SentenceOptions.noAnswers"),
						addAnswer: t("SentenceOptions.addAnswer"),
						nextSentence: t("SentenceOptions.nextSentence"),
						removeAnswer: t("SentenceOptions.removeAnswer"),
						goToSentence: t("SentenceOptions.goToSentence"),
					}}
				/>
			)}
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
