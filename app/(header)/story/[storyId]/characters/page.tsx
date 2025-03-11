import { PageProps } from "@/types/global"
import { CharactersTable } from "../components/characters-table"
import { getCharacters } from "@/actions/character/get-characters"
import { DetailTabs } from "../components/detail-tabs"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function Page({ params }: PageProps<"storyId">) {
	const { storyId } = await params

	const characters = await getCharacters(+storyId)
	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{"Příběh_"}</h1>
				</div>
				<div className="rounded-xl border bg-card text-card-foreground shadow p-2">
					<div className="flex items-center space-x-2">
						<DetailTabs />
						<Button variant="outline" size="sm">
							<PlusCircle className="mr-2 h-4 w-4" />
							{"_Nová postava"}
						</Button>
					</div>
				</div>
			</div>

			<div>
				<CharactersTable storyId={+storyId} data={characters} />
			</div>
		</div>
	)
}
