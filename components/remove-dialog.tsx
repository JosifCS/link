"use client"

import { AlertCircle, Trash2 } from "lucide-react"
import { ActionDialog } from "./action-dialog"
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"

export function RemoveDialog({
	description,
	title,
}: {
	title: string
	description: string
}) {
	return (
		<ActionDialog>
			<DialogContent size={"xs"} className="[&>button]:hidden">
				<DialogHeader className="flex flex-col items-center text-center">
					<Trash2 className="h-20 w-20 text-destructive mb-2" />
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex gap-2">
					<DialogClose asChild>
						<Button
							className="w-full"
							type="button"
							variant="secondary"
						>
							Close
						</Button>
					</DialogClose>
					<Button className="w-full" variant="destructive">
						Remove
					</Button>
				</DialogFooter>
			</DialogContent>
		</ActionDialog>
	)
}
