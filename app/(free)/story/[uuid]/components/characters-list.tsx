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

type CharactersListProps = {
	uuid: string
}

export async function CharactersList({ uuid }: CharactersListProps) {
	const t = await getTranslations("Story")

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
				<div>
					<CardTitle>{t("characters")}</CardTitle>
					<CardDescription>{t("charectersDesc")}</CardDescription>
				</div>
				<Button size="sm">
					<PlusCircle className="mr-2 h-4 w-4" />
					{t("newCharacter")}
				</Button>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{story.characters.map((character) => (
						<div
							key={character.id}
							className="rounded-lg border p-4"
						>
							<div className="flex gap-3 items-start">
								<Avatar className="h-10 w-10">
									<AvatarFallback className="bg-primary/10 text-primary">
										{character.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<h3 className="font-medium">
										{character.name}
									</h3>
									<p className="text-sm text-muted-foreground">
										{character.description}
									</p>

									<div className="flex flex-wrap gap-1 mt-2">
										{character.dialogs
											.map((x) => x.chapter.name)
											.filter(
												(value, index, array) =>
													array.indexOf(value) ===
													index
											)
											.map((chapter) => (
												<Badge
													key={chapter}
													variant="outline"
													className="text-xs"
												>
													{chapter}
												</Badge>
											))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
