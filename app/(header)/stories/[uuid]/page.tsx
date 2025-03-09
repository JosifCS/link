import Link from "next/link"
import { Download, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"
import { PageProps } from "@/types/global"
import { notFound, redirect } from "next/navigation"
import { auth0 } from "@/lib/auth0"
import { CharactersList } from "./components/characters-list"
import { ChaptersList } from "./components/chapters-list"
import { StoryInfo, StoryInfoSkeleton } from "./components/story-info"
import prisma from "@/lib/prisma"
import { Suspense } from "react"

export default async function Page({ params }: PageProps<"uuid">) {
	const session = await auth0.getSession()
	const t = await getTranslations("Story")

	const uuid = (await params).uuid

	const story = await prisma.story.findFirst({
		where: { uuid: { equals: uuid } },
	})

	if (story == null) return notFound()

	if (story == null) return notFound()

	if (story.createdByEmail && session == null) return redirect("/login")

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
