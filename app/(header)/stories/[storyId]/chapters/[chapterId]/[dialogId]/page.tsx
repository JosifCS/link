import { PageProps } from "@/types/global"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"
import { getDialogs } from "@/actions/chapter/get-dialogs"
import { MainCardTitle } from "../components/main-card-title"
import { ButtonLink } from "@/components/button-link"
import { ChevronLeft } from "lucide-react"
import { getSentences } from "@/actions/chapter/get-sentences"
import { DialogForm, DialogFormSkeleton } from "./components/dilaog-form"
import { Suspense } from "react"
import { BackButton } from "../components/back-button"

export default async function Page({
	params,
}: PageProps<"storyId" | "chapterId" | "dialogId">) {
	const { chapterId, storyId, dialogId } = await params
	const t = await getTranslations("Stories.Story.Chapters.Chapter.Dialog")

	const dialog = +dialogId
		? await prisma.dialog.findFirst({
				where: { id: +dialogId },
			})
		: {
				name: "",
				id: 0,
				description: "",
				characterId: 0,
				chapterId: +chapterId,
			}

	if (dialogId == null) notFound()

	const sentences = await getSentences(+dialogId)

	return (
		<div className="container mx-auto py-6 space-y-6 grow flex flex-col">
			<div className="flex gap-2 grow items-stretch">
				<Card className="w-64 bg-muted/40 p-2 flex flex-col">
					<BackButton
						label={t("backToDialogs")}
						href={`/stories/${storyId}/chapters/${chapterId}`}
					/>
				</Card>
				<Card className="grow p-2">
					<MainCardTitle title={t("editDialog")} />
					<Suspense fallback={<DialogFormSkeleton />}>
						<DialogForm
							chapterId={+chapterId}
							dialogId={+dialogId}
						/>
					</Suspense>
				</Card>
			</div>
		</div>
	)
}
