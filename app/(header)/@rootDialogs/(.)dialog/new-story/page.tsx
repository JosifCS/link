import { saveStoryForm } from "@/actions/story/save-story-form"
import { Dialog } from "@/components/dialog"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const t = await getTranslations("RootDialogs.NewStory")

	return (
		<Dialog
			title={t("title")}
			//description={""}
		>
			<Form action={saveStoryForm}>
				<input type="number" name="id" defaultValue={0} hidden />

				<FormInput title={t("name")} name="name" type="text" />
				<input type="text" name="description" defaultValue="" hidden />

				<DialogFooter>
					<Button type="submit">{t("create")}</Button>
				</DialogFooter>
			</Form>
		</Dialog>
	)
}
