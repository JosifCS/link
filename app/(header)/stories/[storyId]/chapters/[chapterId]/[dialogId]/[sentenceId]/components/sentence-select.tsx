"use client"

import { ButtonLink } from "@/components/button-link"
import { FormSelect } from "@/components/form-select"
import { Button } from "@/components/ui/button"
import { ExternalLink, Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"

type SentenceSelectProps = {
	defaultValue: string
	selectOptions: {
		value: string
		label?: string
	}[]
	t: Record<"goToSentence" | "nextSentence", string>
	index: number
}

export function SentenceSelect({
	defaultValue,
	selectOptions,
	index,
	t,
}: SentenceSelectProps) {
	const { chapterId, dialogId, storyId } =
		useParams<Record<"storyId" | "chapterId" | "dialogId", string>>()
	const [value, setValue] = useState<string>(defaultValue)
	return (
		<>
			<FormSelect
				name={`nextSentence[${index}]`}
				label={t.nextSentence}
				options={[{ value: "0", label: "–" }, ...selectOptions]}
				value={value}
				onChange={setValue}
			/>
			<ButtonLink
				href={`/stories/${storyId}/chapters/${chapterId}/${dialogId}/${value}`}
				disabled={+value == 0}
				variant="secondary"
				className="grow-0 px-3"
				title={t.goToSentence}
			>
				<ExternalLink />
			</ButtonLink>
		</>
	)
}
