"use client"

import { ButtonLink } from "@/components/button-link"
import { FormSelect } from "@/components/form-select"
import { Button } from "@/components/ui/button"
import { ExternalLink, Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

type PrevSelectProps = {
	defaultValue: string
	selectOptions: {
		id: number
		text: string
		nextId: number | null
		sentence: {
			text: string
			id: number
		}
	}[]
	t: Record<"goToSentence" | "prevOption", string>
	name: string
}

export function PrevSelect({
	defaultValue,
	selectOptions,
	name,
	t,
}: PrevSelectProps) {
	const { chapterId, dialogId, storyId } =
		useParams<Record<"storyId" | "chapterId" | "dialogId", string>>()
	const [value, setValue] = useState<string>(defaultValue)

	const options = useMemo(() => {
		const o = selectOptions.map((x) => ({
			label: `${x.sentence.text} • ${x.text}${x.nextId ? " ❒" : ""}`,
			value: x.id.toString(),
		}))

		return [{ value: "0", label: "–" }, ...o]
	}, [selectOptions])

	const prevSentence = selectOptions.find((x) => x.id == +value)?.sentence.id

	return (
		<>
			<FormSelect
				name={name}
				label={t.prevOption}
				options={options}
				value={value}
				onChange={setValue}
			/>
			<ButtonLink
				href={`/stories/${storyId}/chapters/${chapterId}/${dialogId}/${prevSentence}`}
				disabled={!prevSentence}
				variant="secondary"
				className="grow-0 px-3"
				title={t.goToSentence}
			>
				<ExternalLink />
			</ButtonLink>
		</>
	)
}
