import { PageProps } from "@/types/global"
import { CharactersTable } from "../components/characters-table"
import { getCharacters } from "@/actions/character/get-characters"

export default async function Page({ params }: PageProps<"storyId">) {
	const { storyId } = await params

	const characters = await getCharacters(+storyId)
	return (
		<div>
			<CharactersTable storyId={+storyId} data={characters} />
		</div>
	)
}
