"use client"

import { GetDialogsQuery } from "@/actions/chapter/get-dialogs"
import { useChapterState } from "@/states/chapter-state"
import { DialogListProps, DialogsList } from "./dialogs-list"

export function LeftCardClient({
	dialogs,
	tList,
}: {
	dialogs: GetDialogsQuery
	tList: DialogListProps["t"]
}) {
	const { level } = useChapterState()

	if (level() == "chapter") return <DialogsList dialogs={dialogs} t={tList} />

	return "XXXX"
}
