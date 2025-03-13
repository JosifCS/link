import { RemoveDialog } from "@/components/remove-dialog"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const t = await getTranslations("RootDialogs.NewStory")

	return <RemoveDialog title="AAAA" description="fdfnvcbnfgh" />
}
