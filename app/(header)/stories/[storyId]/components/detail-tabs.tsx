import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export type TicketVariant = "all" | "unassigned" | "my"

export async function DetailTabs({
	storyId,
	value,
}: {
	storyId: number
	value: "detail" | "chapters" | "characters"
}) {
	const t = await getTranslations("Stories.Story.Componetns.DetailTabs")
	return (
		<Tabs defaultValue={value}>
			<TabsList className="h-9">
				<TabsTrigger className="h-7" value="detail" asChild>
					<Link href={`/stories/${storyId}/detail`}></Link>
					{t("detail")}
				</TabsTrigger>
				<TabsTrigger className="h-7" value="chapters">
					{t("chapters")}
				</TabsTrigger>
				<TabsTrigger className="h-7" value="characters">
					{t("characters")}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
