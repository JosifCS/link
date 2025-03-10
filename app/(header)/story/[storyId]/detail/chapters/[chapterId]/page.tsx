import { PageProps } from "@/types/global"

export default async function Page({
	params,
}: PageProps<"storyId" | "chapterId">) {
	const { chapterId, storyId } = await params
	return <>CHAPTERS</>
}
