"use client"

import { GetCharactersQuery } from "@/actions/character/get-characters"
import { ButtonLink } from "@/components/button-link"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"
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
					<ButtonLink
						variant="ghost"
						className="h-8 w-8 p-0"
						href={`/stories/${storyId}/characters/${getValue()}`}
					>
						<span className="sr-only">Edit character</span>
						<Edit />
					</ButtonLink>
				),
			},
		],
		[]
	)

	return <DataTable data={data} columns={columns} />
}
