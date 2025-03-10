"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type TicketVariant = "all" | "unassigned" | "my"

export function DetailTabs() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!

	const storyId = pathname.split("/")[1]
	const tab = pathname.split("/")[3]

	function onNavigate(variant: string) {
		return router.push(`/story/${storyId}/detail/${variant}`)
	}

	return (
		<Card className="p-2">
			<div className="flex h-8 items-center space-x-2">
				<Tabs value={tab} onValueChange={onNavigate}>
					<TabsList>
						<TabsTrigger value="dashboard">{"Přehled"}</TabsTrigger>
						<TabsTrigger value="chapters">{"Kapitoly"}</TabsTrigger>
						<TabsTrigger value="characters">
							{"Postavy"}
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
		</Card>
	)
}
