import { getTranslations } from "next-intl/server"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { ChapterForm } from "./chapter-form"
import { Card } from "@/components/card"

type ChapterInfoProps = {
	chapterId: number
}

export async function ChapterInfo({ chapterId }: ChapterInfoProps) {
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Components.ChapterForm"
	)

	const chapter = await prisma.chapter.findFirst({
		where: { id: { equals: chapterId } },
	})

	if (chapter == null) return notFound()

	return (
		<Card title={t("title")}>
			<ChapterForm
				t={{ name: t("name"), description: t("description") }}
				value={chapter}
			/>
		</Card>
	)
}

export function ChapterInfoSkeleton() {
	return (
		<Card titleSkeleton>
			<Skeleton className="w-full h-52" />
		</Card>
	)
}
