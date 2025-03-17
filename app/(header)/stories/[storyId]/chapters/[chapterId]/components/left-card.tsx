import { getDialogs } from "@/actions/chapter/get-dialogs"
import { Card, CardContent } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { LeftCardClient } from "./left-card-client"
import { getTranslations } from "next-intl/server"

export async function LeftCard({ chapterId }: { chapterId: number }) {
	const t = await getTranslations("Stories.Story.Chapters.Chapter")
	const dialogs = await getDialogs(chapterId)
	return (
		<Card className="w-64 bg-muted/40 p-2 flex flex-col">
			<LeftCardClient
				dialogs={dialogs}
				tList={{
					new: t("Components.DialogsList.new"),
					noDialogs: t("Components.DialogsList.noDialogs"),
					placeholder: t("Components.DialogsList.placeholder"),
					sentences: t("Components.DialogsList.sentences"),
				}}
			/>
		</Card>
	)
}
