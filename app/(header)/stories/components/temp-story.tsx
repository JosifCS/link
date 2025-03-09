import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { Clock, Edit, FileText, Trash, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function TempStory({ uuid }: { uuid: string }) {
	const story = await prisma.story.findFirst({
		where: { uuid: { equals: uuid } },
		include: { characters: true, chapters: true },
	})

	if (story == undefined) return notFound()

	return (
		<Card className="max-w-2xl mx-auto mt-12">
			<CardHeader>
				<CardTitle className="text-2xl">{story.name}</CardTitle>
				<CardDescription>{story.description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="flex items-center gap-2">
						<Users className="h-5 w-5 text-muted-foreground" />
						<span>Počet postav: {story.characters.length}</span>
					</div>
					<div className="flex items-center gap-2">
						<FileText className="h-5 w-5 text-muted-foreground" />
						<span>Počet kapitol: {story.chapters.length}</span>
					</div>
				</div>
				<div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
					<Clock className="h-5 w-5" />
					<p className="text-sm">
						Tento příběh bude uložen pouze po omezenou dobu (7 dní).
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex justify-end gap-2">
				<Button
					variant="destructive"
					//onClick={() => setShowDeleteConfirmation(true)}
				>
					<Trash className="h-4 w-4 mr-2" />
					Smazat
				</Button>
				<Button variant="default" asChild>
					<Link href={`/story/${story.id}`}>
						<Edit className="h-4 w-4 mr-2" />
						Upravit
					</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
