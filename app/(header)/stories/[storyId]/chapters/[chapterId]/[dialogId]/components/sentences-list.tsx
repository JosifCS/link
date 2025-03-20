"use client"

import { GetSentencesQuery } from "@/actions/chapter/get-sentences"
import { ButtonLink } from "@/components/button-link"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { useMemo, useState } from "react"

export type DialogListProps = {
	sentences: GetSentencesQuery
	t: Record<"placeholder" | "new" | "noSentences", string>
}

export function SentencesList({ sentences, t }: DialogListProps) {
	const [search, setSearch] = useState<string>("")
	const [selectedSentenceId, setSelectedSentenceId] = useState<number>()

	const filteredSentences = useMemo<GetSentencesQuery>(() => {
		if (search.length) {
			const stl = search.toLowerCase()
			return sentences.filter((x) => x.text.toLowerCase().includes(stl))
		}
		return sentences
	}, [sentences, search])

	return (
		<div className="flex flex-col grow">
			<div className="flex gap-2 flex-row">
				<div className="relative grow">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder={t.placeholder}
						className="pl-8"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<ButtonLink
					type="button"
					className="px-3"
					title={t.new}
					href="/"
				>
					<Plus />
				</ButtonLink>
			</div>

			{filteredSentences.length == 0 ? (
				<div className="text-muted-foreground text-sm text-center mt-auto mb-auto">
					{t.noSentences}
				</div>
			) : (
				<div className="space-y-2 flex-1 overflow-auto">
					{filteredSentences?.map((sentence) => (
						<div
							key={sentence.id}
							className={`p-3 rounded-md cursor-pointer ${
								selectedSentenceId === sentence.id
									? "bg-accent text-accent-foreground"
									: "hover:bg-muted"
							}`}
							onClick={() => setSelectedSentenceId(sentence.id)}
						>
							<div className="font-medium line-clamp-2">
								{sentence.text}
							</div>
							{sentence.options.length > 0 && (
								<div className="mt-2 text-sm text-muted-foreground">
									<ul className="mt-1 space-y-1 pl-4">
										{sentence.options.map((option, i) => (
											<li
												key={i}
												className="line-clamp-1"
											>
												• {option.text}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
