import { StoriesTable } from "./components/stories-table"
import { getStories } from "@/actions/story/get-stories"
import { authorize } from "@/modules/auth"
import { Welcome } from "./components/welcome"
import { Button } from "@/components/ui/button"
import { newStory } from "@/actions/story/new-story"
import { PlusCircle } from "lucide-react"

export default async function Page() {
	const { email } = await authorize(false)

	if (email) {
		const stories = await getStories(email)
		return (
			<div className="container mx-auto py-6 space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<h1 className="text-2xl font-bold">Příběhy</h1>
					</div>
					<div className="flex gap-2">
						<Button
							variant={"outline"}
							className="gap-2"
							onClick={newStory}
						>
							<PlusCircle className="h-4 w-4" />
							<span>Nový příběh</span>
						</Button>
					</div>
				</div>

				<StoriesTable data={stories} />
			</div>
		)
	}

	return <Welcome />
}
