import { PageProps } from "@/types/global"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { LeftCard } from "./components/left-card"
import { RightCard } from "./components/right-card"

export default async function Page({
	params,
}: PageProps<"storyId" | "chapterId">) {
	const { chapterId, storyId } = await params
	const t = await getTranslations("Stories.Story.Chapters.Chapter")

	const chapter = await prisma.chapter.findFirst({
		where: { id: +chapterId },
	})

	if (chapter == null) notFound()

	return (
		<div className="container mx-auto py-6 space-y-6 grow flex flex-col">
			<div className="flex gap-2 grow items-stretch">
				<LeftCard chapterId={+chapterId} />
				<RightCard storyId={+storyId} chapterId={+chapterId} />
			</div>
		</div>
	)
}
