import { getTranslations } from "next-intl/server"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { StoryForm } from "./story-form"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/card"

type StoryInfoProps = {
	id: number
}

export async function StoryInfo({ id }: StoryInfoProps) {
	const t = await getTranslations("Stories.Story.Detail.Components.StoryForm")

	const story = await prisma.story.findFirst({
		where: { id: { equals: id } },
	})

	if (story == null) return notFound()

	return (
		<Card title={t("basic")}>
			<StoryForm
				t={{ name: t("name"), description: t("description") }}
				value={story}
			/>
		</Card>
	)
}

export function StoryInfoSkeleton() {
	return (
		<Card titleSkeleton>
			<Skeleton className="w-full h-52" />
		</Card>
	)
}
