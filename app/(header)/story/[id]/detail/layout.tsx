import { ReactNode } from "react"
import { DetailTabs } from "./components/detail-tabs"

export default async function Layout({ tabs }: { tabs: ReactNode }) {
	return (
		<div className="flex-1 flex flex-col justify-between gap-5">
			<div className="flex justify-between">
				<h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
					{"Příběh"}
				</h1>

				<DetailTabs />
			</div>

			{tabs}
		</div>
	)
}
