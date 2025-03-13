import { getTranslations } from "next-intl/server"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { CharacterForm } from "./character-form"
import { Card } from "@/components/card"

type CharacterInfoProps = {
	characterId: number
}

export async function CharacterInfo({ characterId }: CharacterInfoProps) {
	const t = await getTranslations(
		"Stories.Story.Characters.Character.Components.CharacterForm"
	)

	const character = await prisma.character.findFirst({
		where: { id: { equals: characterId } },
	})

	if (character == null) return notFound()

	return (
		<Card title={t("title")}>
			<CharacterForm
				t={{ name: t("name"), description: t("description") }}
				value={character}
			/>
		</Card>
	)
}

export function CharacterInfoSkeleton() {
	return (
		<Card titleSkeleton>
			<Skeleton className="w-full h-52" />
		</Card>
	)
}
