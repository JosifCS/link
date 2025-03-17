"use client"

import { useChapterState } from "@/states/chapter-state"
import { ChapterForm, ChapterFormProps } from "./chapter-form"
import { useEffect } from "react"
import { DialogForm } from "./dilaog-form"

export function RightCardClient({
	chapterId,
	storyId,
	tChapter,
}: {
	chapterId: number
	storyId: number
	tChapter: ChapterFormProps["t"]
}) {
	const { setChapter, dialogId, sentenceId } = useChapterState()

	useEffect(() => {
		setChapter()
	}, [storyId, chapterId])

	if (sentenceId != null) return "Sentence edit"

	if (dialogId != null)
		return (
			<DialogForm
				chapterId={chapterId}
				dialogId={dialogId}
				t={{ description: "", name: "" }}
			/>
		)

	return <ChapterForm chapterId={chapterId} t={tChapter} />
}
