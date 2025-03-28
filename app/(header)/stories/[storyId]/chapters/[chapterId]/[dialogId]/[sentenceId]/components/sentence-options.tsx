"use client"

import { FormInput } from "@/components/form-input"
import { FormSelect } from "@/components/form-select"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Trash } from "lucide-react"
import { useCallback, useState } from "react"
import { SentenceSelect } from "./sentence-select"

type SentenceOptionsProps = {
	defaultValue: {
		id: number
		text: string
		nextId: number | null
	}[]
	selectOptions: {
		value: string
		label?: string
	}[]
	t: Record<
		| "answers"
		| "noAnswers"
		| "answer"
		| "addAnswer"
		| "removeAnswer"
		| "goToSentence"
		| "nextSentence",
		string
	>
}

export function SentenceOptions({
	defaultValue,
	selectOptions,
	t,
}: SentenceOptionsProps) {
	const [options, setOptions] =
		useState<SentenceOptionsProps["defaultValue"]>(defaultValue)

	const handleAdd = useCallback(() => {
		setOptions((o) => [...o, { id: 0, nextId: null, text: "" }])
	}, [])

	return (
		<div className="flex flex-col min-h-0 -mx-2">
			<div className="flex justify-between items-center px-2 mb-2">
				<h3 className="font-medium">Odpovědi</h3>
				<Button variant="outline" size="sm" onClick={handleAdd}>
					{t.addAnswer}
				</Button>
			</div>

			{options.length === 0 ? (
				<div className="text-center py-4 text-muted-foreground text-sm px-2">
					{t.noAnswers}
				</div>
			) : (
				<ScrollArea>
					{options.map((option, i) => (
						<div key={i}>
							<div className="flex gap-2 items-end px-2">
								<FormInput
									type="text"
									name={`answer[${i}]`}
									label={t.answer}
									defaultValue={option.text}
									//autoFocus
								/>
								<SentenceSelect
									defaultValue={
										option.nextId?.toString() ?? "0"
									}
									name={`nextSentence[${i}]`}
									selectOptions={selectOptions}
									t={t}
								/>
								<Button
									type="button"
									variant="destructive"
									className="grow-0 px-3"
									title={t.removeAnswer}
								>
									<Trash />
								</Button>
							</div>

							<Separator className="my-3" />
						</div>
					))}
				</ScrollArea>
			)}
		</div>
	)
}
