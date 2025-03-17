import { Card } from "@/components/ui/card"
import { RightCardClient } from "./right-card-client"
import { RightCardTitle } from "./right-card-title"
import { getTranslations } from "next-intl/server"

export async function RightCard({ chapterId }: { chapterId: number }) {
	const t = await getTranslations("Stories.Story.Chapters.Chapter")
	return (
		<Card className="grow p-2">
			<RightCardTitle
				t={{
					chapter: t("Components.RightCardTitle.chapter"),
					dialog: t("Components.RightCardTitle.dialog"),
					sentence: t("Components.RightCardTitle.sentence"),
				}}
			/>
			<RightCardClient
				chapterId={chapterId}
				tChapter={{
					name: t("Components.ChapterForm.name"),
					description: t("Components.ChapterForm.description"),
				}}
			/>
		</Card>
	)
}
