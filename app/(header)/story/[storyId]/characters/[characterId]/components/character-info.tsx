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
import { Skeleton } from "@/components/ui/skeleton"
import { CharacterForm } from "./character-form"

type CharacterInfoProps = {
	characterId: number
}

export async function CharacterInfo({ characterId }: CharacterInfoProps) {
	const t = await getTranslations(
		"Story.Characters.Character.Components.CharacterForm"
	)

	const character = await prisma.character.findFirst({
		where: { id: { equals: characterId } },
	})

	if (character == null) return notFound()

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="space-y-1.5">
					<CardTitle>{t("title")}</CardTitle>
					<CardDescription>
						{t("subTitle", { story: "XXX" })}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<CharacterForm
					t={{ name: t("name"), description: t("description") }}
					value={character}
				/>
			</CardContent>
		</Card>
	)
}

export function CharacterInfoSkeleton() {
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
