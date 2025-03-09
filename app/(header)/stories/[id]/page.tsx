import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"
import { PageProps } from "@/types/global"
import { notFound, redirect } from "next/navigation"
import { CharactersList } from "./components/characters-list"
import { ChaptersList } from "./components/chapters-list"
import { StoryInfo, StoryInfoSkeleton } from "./components/story-info"
import prisma from "@/lib/prisma"
import { Suspense } from "react"
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
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{t("title")}</h1>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						<Download className="mr-2 h-4 w-4" />
						{t("export")}
					</Button>
				</div>
			</div>

			<Suspense fallback={<StoryInfoSkeleton />}>
				<StoryInfo uuid={story.uuid} />
			</Suspense>

			<div className="grid gap-6 md:grid-cols-2">
				<Suspense fallback={"Loading..."}>
					<ChaptersList uuid={story.uuid} />
				</Suspense>

				<Suspense fallback={"Loading..."}>
					<CharactersList uuid={story.uuid} />
				</Suspense>
			</div>
		</div>
	)
}
