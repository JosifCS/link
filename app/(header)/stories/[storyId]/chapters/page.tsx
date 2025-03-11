import { getChapters } from "@/actions/chapter/get-chapters"
import { PageProps } from "@/types/global"
import { DetailTabs } from "../components/detail-tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { ChaptersTable } from "./components/chapters-table"

export default async function Page({ params }: PageProps<"storyId">) {
	const { storyId } = await params

	const chapters = await getChapters(+storyId)
	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{"Příběh_"}</h1>
				</div>
				<div className="rounded-xl border bg-card text-card-foreground shadow p-2">
					<div className="flex items-center space-x-2">
						<DetailTabs storyId={+storyId} value="chapters" />
						<Button variant="outline" size="sm">
							<PlusCircle className="mr-2 h-4 w-4" />
							{"_Nová kapitola"}
						</Button>
					</div>
				</div>
			</div>

			<div>
				<ChaptersTable storyId={+storyId} data={chapters} />
			</div>
		</div>
	)
}
