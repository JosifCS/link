"use client"

import { useChapterState } from "@/states/chapter-state"
import { DialogEdit } from "./dilaog-edit"
import { ChapterForm, ChapterFormProps } from "./chapter-form"

export function RightCardClient({
	chapterId,
	tChapter,
}: {
	chapterId: number
	tChapter: ChapterFormProps["t"]
}) {
	const { level } = useChapterState()

	if (level() == "chapter")
		return <ChapterForm chapterId={chapterId} t={tChapter} />

	//if (dialogId) return <DialogEdit />

	return <>XXXX</>
}
