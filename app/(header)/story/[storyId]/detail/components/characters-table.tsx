"use client"

import { GetCharactersQuery } from "@/actions/character/get-characters"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

export function CharactersTable({
	storyId,
	data,
}: {
	storyId: number
	data: GetCharactersQuery
}) {
	const columns = useMemo<ColumnDef<GetCharactersQuery[0], any>[]>(
		() => [
			{ accessorKey: "name", meta: { className: "w-full" } },
			{
				accessorKey: "id",
				cell: ({ getValue }) => (
					<Button variant="ghost" className="h-8 w-8 p-0" asChild>
						<Link
							href={`/story/${storyId}/character/${getValue()}`}
						>
							<span className="sr-only">Edit character</span>
							<Edit />
						</Link>
					</Button>
				),
			},
		],
		[]
	)

	return <DataTable data={data} columns={columns} />
}
