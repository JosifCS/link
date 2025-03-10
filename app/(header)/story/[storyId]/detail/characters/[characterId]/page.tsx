import { PageProps } from "@/types/global"

export default async function Page({
	params,
}: PageProps<"storyId" | "characterId">) {
	const { storyId, characterId } = await params
	return <>CHARACTERS</>
}
