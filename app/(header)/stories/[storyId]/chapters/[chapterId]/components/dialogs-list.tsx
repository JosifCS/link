"use client"

import { GetDialogsQuery } from "@/actions/chapter/get-dialogs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChapterState } from "@/states/chapter-state"
import { Plus, Search } from "lucide-react"
import { useMemo, useState } from "react"

export type DialogListProps = {
	dialogs: GetDialogsQuery
	t: Record<"placeholder" | "new" | "noDialogs" | "sentences", string>
}

export function DialogsList({ dialogs, t }: DialogListProps) {
	const [search, setSearch] = useState<string>("")
	const { setDialog } = useChapterState()

	const filteredDialogs = useMemo<GetDialogsQuery>(() => {
		if (search.length) {
			const stl = search.toLowerCase()
			return dialogs.filter((x) => x.name.toLowerCase().includes(stl))
		}
		return dialogs
	}, [dialogs, search])

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
				<Button
					type="button"
					className="px-3"
					title={t.new}
					onClick={() => setDialog(0)}
				>
					<Plus />
				</Button>
			</div>

			{filteredDialogs.length == 0 ? (
				<div className="text-muted-foreground text-sm text-center mt-auto mb-auto">
					{t.noDialogs}
				</div>
			) : (
				<div className="space-y-2 flex-1 overflow-auto">
					{filteredDialogs.map((dialog) => (
						<div
							key={dialog.id}
							className="p-3 rounded-md cursor-pointer hover:bg-muted"
							onClick={() => setDialog(dialog.id)}
						>
							<h3 className="font-medium">{dialog.name}</h3>
							<div className="text-sm text-muted-foreground">
								<span>
									{dialog._count.sentences} {t.sentences}
								</span>
								<span className="mx-1">•</span>
								<span>{dialog.character.name}</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
