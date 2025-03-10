import prisma from "@/lib/prisma"
import { PageProps } from "@/types/global"
import { notFound } from "next/navigation"

export default async function Page({
	params,
}: PageProps<"storyId" | "characterId">) {
	const { storyId, characterId } = await params

	if (+characterId == 0) return <>CHARACTERS</>

	const character = await prisma.character.findFirst({
		where: { id: +characterId },
	})

	if (character == null) notFound()
}
