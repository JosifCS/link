import { Card } from "@/components/ui/card"
import { RightCardClient } from "./right-card-client"
import { RightCardTitle } from "./right-card-title"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { ButtonLink } from "@/components/button-link"

export async function RightCard({
	storyId,
	chapterId,
}: {
	storyId: number
	chapterId: number
}) {
	const t = await getTranslations("Stories.Story.Chapters.Chapter")
	return (
		<Card className="grow p-2">
			<div className="flex justify-between">
				<RightCardTitle
					t={{
						chapter: t("Components.RightCardTitle.chapter"),
						dialog: t("Components.RightCardTitle.dialog"),
						sentence: t("Components.RightCardTitle.sentence"),
					}}
				/>
				<ButtonLink
					href={`/stories/${storyId}/chapters`}
					variant="outline"
				>
					Zpět na příběh
				</ButtonLink>
			</div>

			<RightCardClient
				storyId={storyId}
				chapterId={chapterId}
				tChapter={{
					name: t("Components.ChapterForm.name"),
					description: t("Components.ChapterForm.description"),
				}}
			/>
		</Card>
	)
}
