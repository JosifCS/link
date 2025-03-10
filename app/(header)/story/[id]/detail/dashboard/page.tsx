import { Suspense } from "react"
import { StoryInfo, StoryInfoSkeleton } from "../components/story-info"
import { Clock } from "lucide-react"
import { PageProps } from "@/types/global"
import { getTranslations } from "next-intl/server"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ChaptersCard } from "../components/chapters-card"
import { CharactersCard } from "../components/characters-card"

export default async function Page({ params }: PageProps<"id">) {
	const id = (await params).id

	const t = await getTranslations()

	const story = await prisma.story.findFirst({
		where: { id: { equals: +id } },
	})

	if (story == null) return notFound()

	return (
		<>
			{story.createdById == null && (
				<div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
					<Clock className="h-5 w-5" />
					<p className="text-sm">
						{t("Story.Components.TempStory.message", {
							date: "_DATE_",
						})}
					</p>
				</div>
			)}

			<Suspense fallback={<StoryInfoSkeleton />}>
				<StoryInfo id={story.id} />
			</Suspense>

			<div className="grid gap-6 md:grid-cols-2">
				<Suspense fallback={"Loading..."}>
					<ChaptersCard uuid={story.uuid} />
				</Suspense>

				<Suspense fallback={"Loading..."}>
					<CharactersCard uuid={story.uuid} />
				</Suspense>
			</div>
		</>
	)
}
