"use client"

import { useChapterState } from "@/states/chapter-state"

export function RightCardTitle({
	t,
}: {
	t: Record<"dialog" | "chapter" | "sentence", string>
}) {
	const { level } = useChapterState()

	return (
		<h2
			className="font-medium text-lg h-10 mb-2"
			style={{ lineHeight: "40px" }}
		>
			{level() == "chapter"
				? t.chapter
				: level() == "dialog"
					? t.dialog
					: t.sentence}
		</h2>
	)
}
