import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { getTranslations } from "next-intl/server"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

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
				<div className="space-y-2">
					<label htmlFor="title" className="text-sm font-medium">
						{t("name")}
					</label>
					<Input id="title" defaultValue={story.name} />
				</div>
				<div className="space-y-2">
					<label
						htmlFor="description"
						className="text-sm font-medium"
					>
						{t("description")}
					</label>
					<Textarea
						id="description"
						defaultValue={story.description}
						rows={3}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
