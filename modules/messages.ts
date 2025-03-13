import { TableRowMenuProps } from "@/components/table-row-menu"
import { getTranslations } from "next-intl/server"

export async function tableRowMenuMessages(): Promise<TableRowMenuProps["t"]> {
	const t = await getTranslations("Components.TableRowMenu")

	return {
		edit: t("edit"),
		remove: t("remove"),
	}
}
