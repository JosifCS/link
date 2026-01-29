import { Suspense } from "react"
import { Clock, Download } from "lucide-react"
import { getTranslations } from "next-intl/server"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { getStoryCookie } from "@/actions/story/story-cookies"
import { DetailTabs } from "../components/detail-tabs"
import { Button } from "@/components/ui/button"
import { StoryInfo, StoryInfoSkeleton } from "./components/story-info"
import { ChaptersCard } from "./components/chapters-card"
import { CharactersCard } from "./components/characters-card"

export default async function Page({
	params,
}: PageProps<"/stories/[storyId]/detail">) {
	const { storyId } = await params

	const t = await getTranslations()

	const story = await prisma.story.findFirst({
		where: { id: { equals: +storyId } },
		include: { _count: true },
	})

	if (story == null) return notFound()

	const cookie = await getStoryCookie()

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{t("story")}</h1>
				</div>
				<div className="rounded-xl border bg-card text-card-foreground shadow p-2">
					<div className="flex items-center space-x-2">
						<DetailTabs storyId={+storyId} value="detail" />
						<Button variant="outline" size="sm">
							<Download className="mr-2 h-4 w-4" />
							{t("Stories.Story.Detail.export")}
						</Button>
					</div>
				</div>
			</div>

			{story.createdById == null &&
				cookie &&
				cookie.uuid == story.uuid && (
					<div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
						<Clock className="h-5 w-5" />
						<p className="text-sm">
							{t("Stories.Components.TempStory.message", {
								expire: cookie.expire,
							})}
						</p>
					</div>
				)}

			<div className="grid gap-6 md:grid-cols-2">
				<ChaptersCard
					storyId={story.id}
					count={story._count.chapters}
				/>
				<CharactersCard
					storyId={story.id}
					count={story._count.characters}
				/>
			</div>

			<Suspense fallback={<StoryInfoSkeleton />}>
				<StoryInfo id={story.id} />
			</Suspense>
		</div>
	)
}
