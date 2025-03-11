"use client"

import { GetChaptersQuery } from "@/actions/chapter/get-chapters"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"
import Link from "next/link"
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
					<Button variant="ghost" className="h-8 w-8 p-0" asChild>
						<Link
							href={`/stories/${storyId}/chapters/${getValue()}`}
						>
							<span className="sr-only">Edit chapter</span>
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
