import prisma from "@/lib/prisma"
import { PageProps } from "@/types/global"
import { notFound } from "next/navigation"
import { CharacterInfo } from "./components/character-info"

export default async function Page({
	params,
}: PageProps<"storyId" | "characterId">) {
	const { storyId, characterId } = await params

	const character = await prisma.character.findFirst({
		where: { id: +characterId },
	})

	if (character == null) notFound()

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{"Postava"}</h1>
				</div>
			</div>

			<CharacterInfo characterId={character.id} />
		</div>
	)
}
