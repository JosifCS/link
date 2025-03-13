import { saveChapterForm } from "@/actions/chapter/save-chapter-form"
import { Dialog } from "@/components/dialog"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { PageProps } from "@/types/global"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: PageProps<"storyId">) {
	const { storyId } = await params

	const t = await getTranslations("Stories.Story.Dialogs.NewChapter")
	return (
		<Dialog title={t("title")}>
			<Form action={saveChapterForm}>
				<input type="number" name="id" defaultValue={0} hidden />
				<input
					type="number"
					name="storyId"
					defaultValue={+storyId}
					hidden
				/>

				<FormInput
					title={t("name")}
					name="name"
					type="text"
					placeholder={t("placeholder")}
				/>
				<input type="text" name="description" defaultValue="" hidden />

				<DialogFooter>
					<Button type="submit">{t("create")}</Button>
				</DialogFooter>
			</Form>
		</Dialog>
	)
}
