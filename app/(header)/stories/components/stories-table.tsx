"use client"

import { GetStoriesQuery } from "@/actions/story/get-stories"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export function StoriesTable({ data }: { data: GetStoriesQuery }) {
	const columns = useMemo<ColumnDef<GetStoriesQuery[0], any>[]>(
		() => [{ accessorKey: "name" }],
		[]
	)

	return <DataTable data={data} columns={columns} />
}
