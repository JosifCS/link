"use client"

import { GetStoriesQuery } from "@/actions/story/get-stories"
import { ButtonLink } from "@/components/button-link"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

export function StoriesTable({ data }: { data: GetStoriesQuery }) {
	const columns = useMemo<ColumnDef<GetStoriesQuery[0], any>[]>(
		() => [
			{ accessorKey: "name", meta: { className: "w-full" } },
			{
				accessorKey: "id",
				cell: ({ getValue }) => (
					<ButtonLink
						variant="ghost"
						className="h-8 w-8 p-0"
						href={`/stories/${getValue()}/detail`}
					>
						<span className="sr-only">Edit story</span>
						<Edit />
					</ButtonLink>
				),
			},
		],
		[]
	)

	return <DataTable data={data} columns={columns} />
}
