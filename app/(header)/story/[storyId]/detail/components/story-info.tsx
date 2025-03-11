import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { getTranslations } from "next-intl/server"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { StoryForm } from "./story-form"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

type StoryInfoProps = {
	id: number
}

export async function StoryInfo({ id }: StoryInfoProps) {
	const t = await getTranslations("Story.Detail.Components.StoryForm")

	const story = await prisma.story.findFirst({
		where: { id: { equals: id } },
	})

	if (story == null) return notFound()

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="space-y-1.5">
					<CardTitle>{t("basic")}</CardTitle>
					<CardDescription>{t("basicDesc")}</CardDescription>
				</div>
				<Button variant="outline" size="sm">
					<Download className="mr-2 h-4 w-4" />
					{t("export")}
				</Button>
			</CardHeader>
			<CardContent className="space-y-4">
				<StoryForm
					t={{ name: t("name"), description: t("description") }}
					value={story}
				/>
			</CardContent>
		</Card>
	)
}

export function StoryInfoSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-44" />
				<Skeleton className="h-5 w-52" />
			</CardHeader>
			<CardContent className="space-y-4">
				<Skeleton className="w-full h-52" />
			</CardContent>
		</Card>
	)
}
