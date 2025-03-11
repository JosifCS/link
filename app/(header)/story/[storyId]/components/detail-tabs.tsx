"use client"

import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type TicketVariant = "all" | "unassigned" | "my"

export function DetailTabs() {
	const router = useRouter()
	const pathname = usePathname()

	const storyId = pathname.split("/")[2]
	const tab = pathname.split("/")[3]

	function onNavigate(tab: string) {
		return router.push(`/story/${storyId}/${tab}`)
	}

	return (
		<Tabs value={tab} onValueChange={onNavigate}>
			<TabsList className="h-9">
				<TabsTrigger className="h-7" value="detail">
					{"Přehled"}
				</TabsTrigger>
				<TabsTrigger className="h-7" value="chapters">
					{"Kapitoly"}
				</TabsTrigger>
				<TabsTrigger className="h-7" value="characters">
					{"Postavy"}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
