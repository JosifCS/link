import { Counter } from "./counter"
import { getData } from "./get-data"

export default async function Page({}: PageProps<"/test">) {
	const data = await getData("page")
	console.log("RENDER PAGE")
	return (
		<div>
			<h1>Stránka s daty</h1>
			<p>{data.date}</p>
			<Counter />
		</div>
	)
}
