import { ReactNode } from "react"
import { DetailTabs } from "./components/detail-tabs"

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{"Příběh"}</h1>
				</div>
				<div className="flex gap-2">
					<DetailTabs />
				</div>
			</div>

			{children}
		</div>
	)
}
