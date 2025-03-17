"use client"

import { useChapterState } from "@/states/chapter-state"
import { ChapterForm, ChapterFormProps } from "./chapter-form"
import { useEffect } from "react"

export function RightCardClient({
	chapterId,
	storyId,
	tChapter,
}: {
	chapterId: number
	storyId: number
	tChapter: ChapterFormProps["t"]
}) {
	const { level, setChapter } = useChapterState()

	useEffect(() => {
		setChapter()
	}, [storyId, chapterId])

	if (level() == "chapter")
		return <ChapterForm chapterId={chapterId} t={tChapter} />

	//if (dialogId) return <DialogEdit />

	return <>XXXX</>
}
