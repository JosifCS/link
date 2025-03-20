import { getChapter, GetChapterQuery } from "@/actions/chapter/get-chapter"
import { saveChapterForm } from "@/actions/chapter/save-chapter-form"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormSkeleton } from "@/components/form-skeleton"
import { FormTextArea } from "@/components/form-textarea"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"

export type ChapterFormProps = {
	chapterId: number
}

export async function ChapterForm({ chapterId }: ChapterFormProps) {
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Components.ChapterForm"
	)

	const chapter = await getChapter(chapterId)

	if (chapter == null) notFound()

	return (
		<Form action={saveChapterForm} autoSave>
			<input type="number" name="id" defaultValue={chapter.id} hidden />
			<input
				type="number"
				name="storyId"
				defaultValue={chapter.storyId}
				hidden
			/>
			<FormInput
				type="text"
				name="name"
				label={t("name")}
				defaultValue={chapter.name}
			/>
			<FormTextArea
				name="description"
				label={t("description")}
				defaultValue={chapter.description}
				rows={3}
			/>
		</Form>
	)
}

export async function ChapterFormSkeleton() {
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Components.ChapterForm"
	)

	return (
		<FormSkeleton>
			<FormInput label={t("name")} skeleton />
			<FormTextArea label={t("description")} skeleton />
		</FormSkeleton>
	)
}
