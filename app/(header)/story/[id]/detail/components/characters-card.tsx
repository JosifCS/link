import { Button } from "@/components/ui/button"
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

type CharactersCardProps = {
	uuid: string
}

export async function CharactersCard({ uuid }: CharactersCardProps) {
	const t = await getTranslations("Story.Detail.Components.CharactersCard")

	const story = await prisma.story.findFirst({
		where: { uuid: { equals: uuid } },
		include: {
			characters: {
				include: { dialogs: { include: { chapter: true } } },
			},
		},
	})

	if (story == null) return notFound()

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="space-y-1.5">
					<CardTitle>{t("title")}</CardTitle>
					<CardDescription>
						{t("description", { count: "_C_" })}
					</CardDescription>
				</div>
				<Button size="sm">
					<PlusCircle className="mr-2 h-4 w-4" />
					{t("new")}
				</Button>
			</CardHeader>
		</Card>
	)
}
