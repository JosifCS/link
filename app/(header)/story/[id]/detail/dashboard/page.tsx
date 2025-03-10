import { Suspense } from "react"
import { StoryInfo, StoryInfoSkeleton } from "../components/story-info"
import { ChaptersList } from "../components/chapters-list"
import { CharactersList } from "../components/characters-list"
import { Clock } from "lucide-react"
import { PageProps } from "@/types/global"
import { getTranslations } from "next-intl/server"
import prisma from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { authorize } from "@/modules/auth"

export default async function Page({ params }: PageProps<"id">) {
	const id = (await params).id

	const t = await getTranslations("Story")

	const story = await prisma.story.findFirst({
		where: { id: { equals: +id } },
	})

	// příběh s tímto id neexistuhe
	if (story == null) return notFound()

	const user = await authorize(story)

	// pokouším se zobrazit příběh nějakého uživatele, ale nejsem přihlášený
	if (story.createdById && user.id == null) return redirect("/login")

	if (!user.storyAuthorized) return notFound()

	return (
		<>
			{story.createdById == null && (
				<div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
					<Clock className="h-5 w-5" />
					<p className="text-sm">
						Nejste přihlášený. Tento příběh bude uložen pouze do
						cc.cc.cccc.
					</p>
				</div>
			)}

			<Suspense fallback={<StoryInfoSkeleton />}>
				<StoryInfo id={story.id} />
			</Suspense>

			<div className="grid gap-6 md:grid-cols-2">
				<Suspense fallback={"Loading..."}>
					<ChaptersList uuid={story.uuid} />
				</Suspense>

				<Suspense fallback={"Loading..."}>
					<CharactersList uuid={story.uuid} />
				</Suspense>
			</div>
		</>
	)
}
