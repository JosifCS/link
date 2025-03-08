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

type StoryInfoProps = {
	uuid: string
}

export async function StoryInfo({ uuid }: StoryInfoProps) {
	const t = await getTranslations("Story")

	const story = await prisma.story.findFirst({
		where: { uuid: { equals: uuid } },
	})

	if (story == null) return notFound()

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("basic")}</CardTitle>
				<CardDescription>{t("basicDesc")}</CardDescription>
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
