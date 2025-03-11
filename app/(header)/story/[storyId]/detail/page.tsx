import { Suspense } from "react"
import { StoryInfo, StoryInfoSkeleton } from "../components/story-info"
import { Clock, Download } from "lucide-react"
import { PageProps } from "@/types/global"
import { getTranslations } from "next-intl/server"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ChaptersCard } from "../components/chapters-card"
import { CharactersCard } from "../components/characters-card"
import { getStoryCookie } from "@/actions/story/story-cookies"
import { DetailTabs } from "../components/detail-tabs"
import { Button } from "@/components/ui/button"

export default async function Page({ params }: PageProps<"storyId">) {
	const id = (await params).storyId

	const t = await getTranslations()

	const story = await prisma.story.findFirst({
		where: { id: { equals: +id } },
		include: { _count: true },
	})

	if (story == null) return notFound()

	const cookie = await getStoryCookie()

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{"Příběh_"}</h1>
				</div>
				<div className="rounded-xl border bg-card text-card-foreground shadow p-2">
					<div className="flex items-center space-x-2">
						<DetailTabs />
						<Button variant="outline" size="sm">
							<Download className="mr-2 h-4 w-4" />
							{"_Export"}
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
							{t("Story.Components.TempStory.message", {
								expire: cookie.expire,
							})}
						</p>
					</div>
				)}

			<Suspense fallback={<StoryInfoSkeleton />}>
				<StoryInfo id={story.id} />
			</Suspense>

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
		</div>
	)
}
