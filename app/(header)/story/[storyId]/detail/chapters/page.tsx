import { getChapters } from "@/actions/chapter/get-chapters"
import { ChaptersTable } from "../components/chapters-table"
import { PageProps } from "@/types/global"

export default async function Page({ params }: PageProps<"storyId">) {
	const { storyId } = await params

	const chapters = await getChapters(+storyId)
	return (
		<div>
			<ChaptersTable storyId={+storyId} data={chapters} />
		</div>
	)
}
