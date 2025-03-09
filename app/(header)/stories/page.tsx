import { getTranslations } from "next-intl/server"
import { auth0 } from "@/lib/auth0"
import { StoriesTable } from "./components/stories-table"
import { getStories } from "@/actions/story/get-stories"
import { redirect } from "next/navigation"

export default async function Page() {
	const session = await auth0.getSession()
	const t = await getTranslations("Story")

	if (session == null) return redirect("/login")

	const stories = await getStories(session.user.email!)

	return <StoriesTable data={stories} />
}
