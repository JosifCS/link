import { saveDialogForm } from "@/actions/chapter/save-dialog-form"
import { ButtonLink } from "@/components/button-link"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormSelect } from "@/components/form-select"
import { FormSkeleton } from "@/components/form-skeleton"
import { FormTextArea } from "@/components/form-textarea"
import prisma from "@/lib/prisma"
import { urlSource } from "@/modules/urlSource"
import { PlusCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

export type DialogFormProps = {
	dialogId: number
	chapterId: number
	storyId: number
}

export async function DialogForm({
	dialogId,
	chapterId,
	storyId,
}: DialogFormProps) {
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Dialog.Components.DialogForm"
	)

	const value =
		dialogId == 0
			? {
					name: "",
					id: 0,
					chapterId,
					characterId: 0,
					description: "",
				}
			: await prisma.dialog.findFirst({
					where: { id: { equals: dialogId } },
				})

	if (value == null) notFound()

	const characters = await prisma.character.findMany({
		select: { id: true, name: true },
	})

	return (
		<Form
			action={saveDialogForm}
			autoSave={(value?.id ?? 0) > 0}
			submitLabel={t("createDialog")}
		>
			<input type="number" name="id" defaultValue={value?.id} hidden />
			<input
				type="number"
				name="chapterId"
				defaultValue={value?.chapterId}
				hidden
			/>
			<FormInput
				type="text"
				name="name"
				label={t("name")}
				defaultValue={value?.name}
			/>
			<FormTextArea
				type="text"
				name="description"
				label={t("description")}
				defaultValue={value?.description}
			/>
			<div className="flex gap-2 items-end">
				<FormSelect
					name="characterId"
					label={t("character")}
					options={characters.map((x) => ({
						value: x.id.toString(),
						label: x.name,
					}))}
					defaultValue={value?.characterId.toString()}
				/>
				<ButtonLink
					href={`/stories/${storyId}/dialog/new-character?${urlSource(`/stories/${storyId}/chapters/${chapterId}/${dialogId}`)}`}
					variant="outline"
					className="grow-0 px-3"
					title={t("newCharacter")}
				>
					<PlusCircle />
				</ButtonLink>
			</div>
		</Form>
	)
}

export async function DialogFormSkeleton() {
	const t = await getTranslations(
		"Stories.Story.Chapters.Chapter.Dialog.Components.DialogForm"
	)

	return (
		<FormSkeleton>
			<FormInput label={t("name")} skeleton />
			<FormTextArea label={t("description")} skeleton />
			<FormInput label={t("character")} skeleton />
		</FormSkeleton>
	)
}
