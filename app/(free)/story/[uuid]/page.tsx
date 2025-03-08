import Link from "next/link"
import { Download, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getTranslations } from "next-intl/server"
import { PageProps } from "@/types/global"
import { notFound, redirect } from "next/navigation"
import { auth0 } from "@/lib/auth0"
import { getStory } from "@/actions/get"
import { CharactersList } from "./components/characters-list"
import { ChaptersList } from "./components/chapters-list"

export default async function Story({ params }: PageProps<"uuid">) {
	const session = await auth0.getSession()
	const t = await getTranslations("Story")

	const uuid = (await params).uuid

	const story = await getStory(uuid)

	if (story == null) return notFound()

	if (story.createdByEmail && session == null) return redirect("/login")

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold">{t("title")}</h1>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						<Download className="mr-2 h-4 w-4" />
						{t("export")}
					</Button>
					<Button variant="outline" size="sm" asChild>
						<Link href="/stories">
							<BookOpen className="mr-2 h-4 w-4" />
							{t("stories")}
						</Link>
					</Button>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{t("basic")}</CardTitle>
					<CardDescription>{t("basicDesc")}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="title" className="text-sm font-medium">
							{t("name")}
						</label>
						<Input id="title" defaultValue={story.name} />
					</div>
					<div className="space-y-2">
						<label
							htmlFor="description"
							className="text-sm font-medium"
						>
							{t("description")}
						</label>
						<Textarea
							id="description"
							defaultValue={story.description}
							rows={3}
						/>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-6 md:grid-cols-2">
				<ChaptersList chapters={story.chapters} />
				<CharactersList characters={story.characters} />
			</div>
		</div>
	)
}
