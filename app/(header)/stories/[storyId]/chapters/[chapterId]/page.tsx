import { PageProps } from "@/types/global"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"
import { MainCardTitle } from "./components/main-card-title"
import { DialogsList } from "./components/dialogs-list"
import { getDialogs } from "@/actions/chapter/get-dialogs"
import { ChapterForm, ChapterFormSkeleton } from "./components/chapter-form"
import { BackButton } from "./components/back-button"
import { Suspense } from "react"

export default async function Page({
	params,
}: PageProps<"storyId" | "chapterId">) {
	const { chapterId, storyId } = await params
	const t = await getTranslations("Stories.Story.Chapters.Chapter")

	const chapter = await prisma.chapter.findFirst({
		where: { id: +chapterId },
	})

	if (chapter == null) notFound()

	const dialogs = await getDialogs(+chapterId)

	return (
		<div className="container mx-auto py-6 space-y-6 grow flex flex-col">
			<div className="flex gap-2 grow items-stretch">
				<Card className="w-64 bg-muted/40 p-2 flex flex-col">
					<BackButton
						label={t("backToChapters")}
						href={`/stories/${storyId}/chapters`}
					/>
					<DialogsList
						dialogs={dialogs}
						t={{
							new: t("Components.DialogsList.new"),
							noDialogs: t("Components.DialogsList.noDialogs"),
							placeholder: t(
								"Components.DialogsList.placeholder"
							),
							sentences: t("Components.DialogsList.sentences"),
						}}
					/>
				</Card>
				<Card className="grow p-2">
					<MainCardTitle title={t("editChapter")} />
					<Suspense fallback={<ChapterFormSkeleton />}>
						<ChapterForm chapterId={+chapterId} />
					</Suspense>
				</Card>
			</div>
		</div>
	)
}
