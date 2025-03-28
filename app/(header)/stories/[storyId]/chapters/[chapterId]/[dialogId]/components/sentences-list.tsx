"use client"

import { GetSentencesQuery } from "@/actions/chapter/get-sentences"
import { ButtonLink } from "@/components/button-link"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { BackButton } from "../../components/back-button"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearch } from "@/modules/useSearch"

export type DialogListProps = {
	sentences: GetSentencesQuery
	t: Record<
		| "placeholder"
		| "new"
		| "noSentences"
		| "backToDialogs"
		| "backToDialog",
		string
	>
}

export function SentencesList({ sentences, t }: DialogListProps) {
	const { storyId, chapterId, sentenceId, dialogId } =
		useParams<
			Record<"storyId" | "chapterId" | "sentenceId" | "dialogId", string>
		>()

	const { filtered, searchValue, setSearchValue } = useSearch({
		options: sentences,
		path: `/stories/${storyId}/chapters/${chapterId}/${dialogId}`,
		selectedId: +sentenceId,
		valueKey: "text",
	})

	return (
		<>
			{sentenceId != undefined ? (
				<BackButton
					label={t.backToDialog}
					href={`/stories/${storyId}/chapters/${chapterId}/${dialogId}`}
				/>
			) : (
				<BackButton
					label={t.backToDialogs}
					href={`/stories/${storyId}/chapters/${chapterId}`}
				/>
			)}
			<div className="flex flex-col grow min-h-0 -mx-2">
				{+dialogId != 0 && (
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
							href={`/stories/${storyId}/chapters/${chapterId}/${dialogId}/0`}
						>
							<Plus />
						</ButtonLink>
					</div>
				)}

				{filtered.length == 0 ? (
					<div className="text-muted-foreground text-sm text-center mt-auto mb-auto">
						{t.noSentences}
					</div>
				) : (
					<ScrollArea className="space-y-1 flex-1 px-2">
						{filtered.map((sentence) => (
							<Link
								key={sentence.id}
								className={`block p-3 rounded-md cursor-pointer ${
									+sentenceId === sentence.id
										? "bg-accent text-accent-foreground"
										: "hover:bg-muted"
								}`}
								href={`/stories/${storyId}/chapters/${chapterId}/${dialogId}/${sentence.id}`}
							>
								<div className="font-medium line-clamp-2">
									{sentence.text}
								</div>
								{sentence.options.length > 0 && (
									<ul className="text-sm text-muted-foreground list-disc list-inside">
										{sentence.options.map((option, i) => (
											<li key={i}>{option.text}</li>
										))}
									</ul>
								)}
							</Link>
						))}
					</ScrollArea>
				)}
			</div>
		</>
	)
}
