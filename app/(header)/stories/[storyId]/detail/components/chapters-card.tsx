import { ButtonLink } from "@/components/button-link"
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"

type ChaptersCardProps = {
	storyId: number
	count: number
}

export async function ChaptersCard({ storyId, count }: ChaptersCardProps) {
	const t = await getTranslations(
		"Stories.Story.Detail.Components.ChaptersCard"
	)

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="space-y-1.5">
					<CardTitle>{t("title")}</CardTitle>
					<CardDescription>
						{t("description", { count })}
					</CardDescription>
				</div>
				<ButtonLink
					size="sm"
					href={`/stories/${storyId}/dialog/new-chapter`}
				>
					<PlusCircle className="mr-2 h-4 w-4" />
					{t("new")}
				</ButtonLink>
			</CardHeader>
		</Card>
	)
}
