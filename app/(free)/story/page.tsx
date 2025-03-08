import Link from "next/link"
import { PlusCircle, ArrowLeft, Download, BookOpen } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getTranslations } from "next-intl/server"

export default async function Story() {
	const t = await getTranslations("Story")
	// Sample data - in a real app, this would come from a database or API
	const story = {
		id: "1",
		title: "Cesta do neznáma",
		description: "Dobrodružný příběh o cestě do neznámých krajin.",
		chapters: [
			{
				id: "ch1",
				title: "Začátek cesty",
				dialogCount: 24,
				characters: ["Anna", "Karel", "Petr"],
			},
			{
				id: "ch2",
				title: "Setkání s cizincem",
				dialogCount: 18,
				characters: ["Anna", "Petr", "Tajemný cizinec"],
			},
			{
				id: "ch3",
				title: "Nebezpečí v horách",
				dialogCount: 32,
				characters: ["Anna", "Karel", "Petr", "Tajemný cizinec"],
			},
		],
		characters: [
			{
				id: "char1",
				name: "Anna",
				description: "Odvážná průzkumnice s bystrým úsudkem.",
				chapters: [
					"Začátek cesty",
					"Setkání s cizincem",
					"Nebezpečí v horách",
				],
			},
			{
				id: "char2",
				name: "Karel",
				description: "Zkušený horolezec a Annin dlouholetý přítel.",
				chapters: ["Začátek cesty", "Nebezpečí v horách"],
			},
			{
				id: "char3",
				name: "Petr",
				description: "Mladý vědec specializující se na místní folklór.",
				chapters: [
					"Začátek cesty",
					"Setkání s cizincem",
					"Nebezpečí v horách",
				],
			},
			{
				id: "char4",
				name: "Tajemný cizinec",
				description: "Záhadná postava, která zná cestu horami.",
				chapters: ["Setkání s cizincem", "Nebezpečí v horách"],
			},
		],
	}

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
						<Input id="title" defaultValue={story.title} />
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
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle>{t("chapters")}</CardTitle>
							<CardDescription>
								{t("chaptersDesc")}
							</CardDescription>
						</div>
						<Button size="sm">
							<PlusCircle className="mr-2 h-4 w-4" />
							{t("newChapter")}
						</Button>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{story.chapters.map((chapter) => (
								<div
									key={chapter.id}
									className="rounded-lg border p-4"
								>
									<div className="flex justify-between items-start">
										<h3 className="font-medium">
											{chapter.title}
										</h3>
										<Badge variant="outline">
											{t("dialogsCount", {
												count: chapter.dialogCount,
											})}
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground">
										Popis kapitoly
									</p>
									<div className="flex flex-wrap gap-2 mt-2">
										{chapter.characters.map((character) => (
											<Badge
												key={character}
												variant="secondary"
											>
												{character}
											</Badge>
										))}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle>{t("characters")}</CardTitle>
							<CardDescription>
								{t("charectersDesc")}
							</CardDescription>
						</div>
						<Button size="sm">
							<PlusCircle className="mr-2 h-4 w-4" />
							{t("newCharacter")}
						</Button>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{story.characters.map((character) => (
								<div
									key={character.id}
									className="rounded-lg border p-4"
								>
									<div className="flex gap-3 items-start">
										<Avatar className="h-10 w-10">
											<AvatarFallback className="bg-primary/10 text-primary">
												{character.name.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1">
											<h3 className="font-medium">
												{character.name}
											</h3>
											<p className="text-sm text-muted-foreground">
												{character.description}
											</p>

											<div className="flex flex-wrap gap-1 mt-2">
												{character.chapters.map(
													(chapter) => (
														<Badge
															key={chapter}
															variant="outline"
															className="text-xs"
														>
															{chapter}
														</Badge>
													)
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
