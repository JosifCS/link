import { PageProps } from "@/types/global"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"
import { SentenceForm, SentenceFormSkeleton } from "./components/sentence-form"
import { MainCardTitle } from "../../components/main-card-title"

export default async function Page({
	params,
}: PageProps<"storyId" | "chapterId" | "dialogId" | "sentenceId">) {
	const { dialogId, sentenceId } = await params
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Dialog.Sentence"
	)

	return (
		<>
			<MainCardTitle title={t("editSentence")} />
			<Suspense fallback={<SentenceFormSkeleton />}>
				<SentenceForm dialogId={+dialogId} sentenceId={+sentenceId} />
			</Suspense>
		</>
	)
}
