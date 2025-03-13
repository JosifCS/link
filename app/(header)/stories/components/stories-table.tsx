"use client"

import { GetStoriesQuery } from "@/actions/story/get-stories"
import { DataTable } from "@/components/data-table"
import { TableRowMenu, TableRowMenuProps } from "@/components/table-row-menu"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export function StoriesTable({
	data,
	tRowMenu,
}: {
	data: GetStoriesQuery
	tRowMenu: TableRowMenuProps["t"]
}) {
	const columns = useMemo<ColumnDef<GetStoriesQuery[0], any>[]>(
		() => [
			{ accessorKey: "name", meta: { className: "w-full" } },
			{
				accessorKey: "id",
				cell: ({ getValue }) => (
					<TableRowMenu
						t={tRowMenu}
						editHref={`/stories/${getValue()}/detail`}
					/>
				),
			},
		],
		[]
	)

	return <DataTable data={data} columns={columns} />
}
