import { getTranslations } from "next-intl/server"
import { MainCardTitle } from "../components/main-card-title"
import { DialogForm, DialogFormSkeleton } from "./components/dialog-form"
import { Suspense } from "react"

export default async function Page({
	params,
}: PageProps<"/stories/[storyId]/chapters/[chapterId]/[dialogId]">) {
	const { chapterId, dialogId, storyId } = await params
	const t = await getTranslations("Stories.Story.Chapters.Chapter.Dialog")

	return (
		<>
			<MainCardTitle title={t("editDialog")} />
			<Suspense fallback={<DialogFormSkeleton />}>
				<DialogForm
					chapterId={+chapterId}
					dialogId={+dialogId}
					storyId={+storyId}
				/>
			</Suspense>
		</>
	)
}
