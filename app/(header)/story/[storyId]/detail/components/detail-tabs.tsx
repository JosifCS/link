"use client"

import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type TicketVariant = "all" | "unassigned" | "my"

export function DetailTabs() {
	const router = useRouter()
	const pathname = usePathname()

	const storyId = pathname.split("/")[2]
	const tab = pathname.split("/")[4]

	function onNavigate(variant: string) {
		return router.push(`/story/${storyId}/detail/${variant}`)
	}

	return (
		<Tabs value={tab} onValueChange={onNavigate}>
			<TabsList>
				<TabsTrigger value="dashboard">{"Přehled"}</TabsTrigger>
				<TabsTrigger value="chapters">{"Kapitoly"}</TabsTrigger>
				<TabsTrigger value="characters">{"Postavy"}</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
