import { PageProps } from "@/types/global"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"
import { getSentences } from "@/actions/chapter/get-sentences"
import { ReactNode } from "react"
import { BackButton } from "../components/back-button"
import { SentencesList } from "./components/sentences-list"

export default async function Layout({
	children,
	params,
}: PageProps<"storyId" | "chapterId" | "dialogId"> & { children: ReactNode }) {
	const { chapterId, storyId, dialogId } = await params
	const t = await getTranslations("Stories.Story.Chapters.Chapter.Dialog")

	if (dialogId == null) notFound()

	const sentences = await getSentences(+dialogId)

	return (
		<div className="container mx-auto py-6 space-y-6 grow flex flex-col">
			<div className="flex gap-2 grow items-stretch max-h-[calc(100vh-100px)]">
				<Card className="w-64 bg-muted/40 p-2 flex flex-col">
					<SentencesList
						sentences={sentences}
						t={{
							new: t("Components.SentencesList.new"),
							noSentences: t(
								"Components.SentencesList.noSentences"
							),
							placeholder: t(
								"Components.SentencesList.placeholder"
							),
							backToDialogs: t(
								"Components.SentencesList.backToDialogs"
							),
							backToDialog: t(
								"Components.SentencesList.backToDialog"
							),
						}}
					/>
				</Card>
				<Card className="grow p-2 flex flex-col">{children}</Card>
			</div>
		</div>
	)
}
