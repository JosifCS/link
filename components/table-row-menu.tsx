"use client"

import { Edit, Ellipsis, Trash2 } from "lucide-react"
import { ButtonLink } from "./button-link"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import Link from "next/link"

export type TableRowMenuProps = {
	editHref?: string
	removeHref?: string
	t: Record<"edit" | "remove", string>
}

export function TableRowMenu({ editHref, removeHref, t }: TableRowMenuProps) {
	return (
		<div className="flex">
			{editHref && (
				<ButtonLink
					variant="ghost"
					className="h-8 w-8 p-0"
					href={editHref}
				>
					<span className="sr-only">{t.edit}</span>
					<Edit />
				</ButtonLink>
			)}

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<Ellipsis />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-20" align="end">
					<DropdownMenuGroup>
						{removeHref && (
							<DropdownMenuItem asChild>
								<Link href={removeHref}>
									<Trash2 />
									{t.remove}
								</Link>
							</DropdownMenuItem>
						)}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
