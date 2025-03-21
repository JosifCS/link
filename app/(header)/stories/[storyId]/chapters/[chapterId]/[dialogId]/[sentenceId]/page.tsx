import { PageProps } from "@/types/global"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

export default async function Page({
	params,
}: PageProps<"storyId" | "chapterId" | "dialogId" | "sentenceId">) {
	const { chapterId, dialogId } = await params
	const t = await getTranslations("Stories.Story.Chapters.Chapter.Dialog")

	return <>Sentence Edit</>
}
