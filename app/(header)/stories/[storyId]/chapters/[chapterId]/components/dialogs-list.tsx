"use client"

import { GetDialogsQuery } from "@/actions/chapter/get-dialogs"
import { ButtonLink } from "@/components/button-link"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearch } from "@/modules/useSearch"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export type DialogListProps = {
	dialogs: GetDialogsQuery
	t: Record<"placeholder" | "new" | "noDialogs" | "sentences", string>
}

export function DialogsList({ dialogs, t }: DialogListProps) {
	const { storyId, chapterId } = useParams<{
		storyId: string
		chapterId: string
	}>()

	const { filtered, searchValue, setSearchValue } = useSearch({
		options: dialogs,
		selectedId: +chapterId,
		valueKey: "name",
	})

	return (
		<div className="flex flex-col grow min-h-0 -mx-2">
			<div className="flex gap-2 flex-row mb-2 px-2">
				<div className="relative grow">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder={t.placeholder}
						className="pl-8"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</div>
				<ButtonLink
					type="button"
					className="px-3"
					title={t.new}
					href={`/stories/${storyId}/chapters/${chapterId}/0`}
				>
					<Plus />
				</ButtonLink>
			</div>

			{filtered.length == 0 ? (
				<div className="text-muted-foreground text-sm text-center mt-auto mb-auto">
					{t.noDialogs}
				</div>
			) : (
				<ScrollArea className="space-y-1 flex-1 px-2">
					{filtered.map((dialog) => (
						<Link
							key={dialog.id}
							className="block p-3 rounded-md cursor-pointer hover:bg-muted"
							href={`/stories/${storyId}/chapters/${chapterId}/${dialog.id}`}
							passHref
						>
							<h3 className="font-medium">{dialog.name}</h3>
							<div className="text-sm text-muted-foreground">
								<span>
									{dialog._count.sentences} {t.sentences}
								</span>
								<span className="mx-1">•</span>
								<span>{dialog.character.name}</span>
							</div>
						</Link>
					))}
				</ScrollArea>
			)}
		</div>
	)
}
