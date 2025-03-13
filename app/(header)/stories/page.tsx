import { StoriesTable } from "./components/stories-table"
import { getStories } from "@/actions/story/get-stories"
import { authorize } from "@/modules/auth"
import { Welcome } from "./components/welcome"
import { PlusCircle, Upload } from "lucide-react"
import { getTranslations } from "next-intl/server"
import TempStory from "./components/temp-story"
import { getStoryCookie } from "@/actions/story/story-cookies"
import { ButtonLink } from "@/components/button-link"

export default async function Page() {
	const { id } = await authorize(true)

	const t = await getTranslations("Stories")

	// přihlášený uživatel
	if (id) {
		const stories = await getStories(id)
		return (
			<div className="container mx-auto py-6 space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<h1 className="text-2xl font-bold">{t("stories")}</h1>
					</div>
					<div className="flex gap-2">
						<ButtonLink
							variant="outline"
							className="gap-2"
							href={"/dialog/import-story"}
						>
							<Upload className="h-4 w-4" />
							<span>{t("import")}</span>
						</ButtonLink>
						<ButtonLink
							variant={"outline"}
							className="gap-2"
							href="/dialog/new-story"
						>
							<PlusCircle className="h-4 w-4" />
							<span>{t("new")}</span>
						</ButtonLink>
					</div>
				</div>

				<StoriesTable data={stories} />
			</div>
		)
	}

	const cookie = await getStoryCookie()

	// nepřihlášený uživatel, který má story v cookies
	if (cookie) return <TempStory uuid={cookie.uuid} expire={cookie.expire} />

	// nepřihlášený uživatel, který nemá sni story v cookies
	return <Welcome />
}
