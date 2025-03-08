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
import { GetStoryQuery } from "@/actions/get"

type ChaptersListProps = {
	chapters: GetStoryQuery["chapters"]
}

export async function ChaptersList({ chapters }: ChaptersListProps) {
	const t = await getTranslations("Story")

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle>{t("chapters")}</CardTitle>
					<CardDescription>{t("chaptersDesc")}</CardDescription>
				</div>
				<Button size="sm">
					<PlusCircle className="mr-2 h-4 w-4" />
					{t("newChapter")}
				</Button>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{chapters.map((chapter) => (
						<div key={chapter.id} className="rounded-lg border p-4">
							<div className="flex justify-between items-start">
								<h3 className="font-medium">{chapter.title}</h3>
								<Badge variant="outline">
									{t("dialogsCount", {
										count: chapter.dialogs.length,
									})}
								</Badge>
							</div>
							<p className="text-sm text-muted-foreground">
								Popis kapitoly
							</p>
							<div className="flex flex-wrap gap-2 mt-2">
								{chapter.dialogs
									.map((x) => x.character.title)
									.filter(
										(value, index, array) =>
											array.indexOf(value) === index
									)
									.map((character) => (
										<Badge
											key={character}
											variant="secondary"
										>
											{character}
										</Badge>
									))}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
