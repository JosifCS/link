"use client"

import { GetChaptersQuery } from "@/actions/chapter/get-chapters"
import { ButtonLink } from "@/components/button-link"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"
import { useMemo } from "react"

export function ChaptersTable({
	storyId,
	data,
}: {
	storyId: number
	data: GetChaptersQuery
}) {
	const columns = useMemo<ColumnDef<GetChaptersQuery[0], any>[]>(
		() => [
			{ accessorKey: "name", meta: { className: "w-full" } },
			{
				accessorKey: "id",
				cell: ({ getValue }) => (
					<ButtonLink
						variant="ghost"
						className="h-8 w-8 p-0"
						href={`/stories/${storyId}/chapters/${getValue()}`}
					>
						<span className="sr-only">Edit chapter</span>
						<Edit />
					</ButtonLink>
				),
			},
		],
		[]
	)

	return <DataTable data={data} columns={columns} />
}
