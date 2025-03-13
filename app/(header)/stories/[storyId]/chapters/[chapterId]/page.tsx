import { PageProps } from "@/types/global"
import { ChapterInfo } from "./components/chapter-info"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

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
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" asChild>
						<Link href={`/stories/${storyId}/chapters`}>
							<ChevronLeft className="h-4 w-4" />
						</Link>
					</Button>
					<h1 className="text-2xl font-bold">{t("chapter")}</h1>
				</div>
			</div>

			<ChapterInfo chapterId={chapter.id} />
		</div>
	)
}
