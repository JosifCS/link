import { getChapters } from "@/actions/chapter/get-chapters"
import { DetailTabs } from "../components/detail-tabs"
import { PlusCircle } from "lucide-react"
import { ChaptersTable } from "./components/chapters-table"
import { Card } from "@/components/card"
import { getTranslations } from "next-intl/server"
import { ButtonLink } from "@/components/button-link"

export default async function Page({
	params,
}: PageProps<"/stories/[storyId]/chapters">) {
	const t = await getTranslations("Stories.Story.Chapters")
	const { storyId } = await params

	const chapters = await getChapters(+storyId)
	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{t("sotry")}</h1>
				</div>
				<div className="rounded-xl border bg-card text-card-foreground shadow p-2">
					<div className="flex items-center space-x-2">
						<DetailTabs storyId={+storyId} value="chapters" />
						<ButtonLink
							variant="outline"
							size="sm"
							href={`/stories/${storyId}/dialog/new-chapter`}
						>
							<PlusCircle className="mr-2 h-4 w-4" />
							{t("newChapter")}
						</ButtonLink>
					</div>
				</div>
			</div>

			<Card title={t("chapters")}>
				<ChaptersTable storyId={+storyId} data={chapters} />
			</Card>
			<div></div>
		</div>
	)
}
