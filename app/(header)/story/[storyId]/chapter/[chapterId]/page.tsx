import { PageProps } from "@/types/global"
import { ChapterInfo } from "./components/chapter-info"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function Page({
	params,
}: PageProps<"storyId" | "chapterId">) {
	const { chapterId, storyId } = await params

	const chapter = await prisma.chapter.findFirst({
		where: { id: +chapterId },
	})

	if (chapter == null) notFound()

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{"Postava"}</h1>
				</div>
			</div>

			<ChapterInfo chapterId={chapter.id} />
		</div>
	)
}
