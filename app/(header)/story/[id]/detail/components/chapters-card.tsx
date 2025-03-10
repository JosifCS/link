import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

type ChaptersCardProps = {
	uuid: string
}

export async function ChaptersCard({ uuid }: ChaptersCardProps) {
	const t = await getTranslations("Story.Detail.Components.ChaptersCard")

	const story = await prisma.story.findFirst({
		where: { uuid: { equals: uuid } },
		include: {
			chapters: {
				include: { dialogs: { include: { character: true } } },
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
