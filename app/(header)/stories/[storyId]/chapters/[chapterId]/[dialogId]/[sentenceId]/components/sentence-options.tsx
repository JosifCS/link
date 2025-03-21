"use client"

import { FormInput } from "@/components/form-input"
import { FormSelect } from "@/components/form-select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"
import { useCallback, useState } from "react"

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
}

export function SentenceOptions({
	defaultValue,
	selectOptions,
}: SentenceOptionsProps) {
	const [options, setOptions] =
		useState<SentenceOptionsProps["defaultValue"]>(defaultValue)

	const handleAdd = useCallback(() => {
		setOptions((o) => [...o, { id: 0, nextId: null, text: "" }])
	}, [])

	return (
		<div className="space-y-3">
			<div className="flex justify-between items-center">
				<h3 className="font-medium">Odpovědi</h3>
				<Button variant="outline" size="sm" onClick={handleAdd}>
					Přidat odpověď_
				</Button>
			</div>

			{options.length === 0 ? (
				<div className="text-center py-4 text-muted-foreground text-sm">
					Tato věta nemá žádné odpovědi._
				</div>
			) : (
				<div className="space-y-3">
					{options.map((option, i) => (
						<div key={i}>
							<div className="flex gap-2 items-end">
								<FormInput
									type="text"
									name="optionX"
									label="Text_"
									defaultValue={option.text}
								/>
								<FormSelect
									name="optionY"
									label="Následující věta_"
									options={selectOptions}
									defaultValue={option.nextId?.toString()}
								/>
								<Button
									type="button"
									variant="destructive"
									className="grow-0 px-3"
									title="Odstranit odpověď_"
								>
									<Trash />
								</Button>
							</div>

							<Separator className="mt-3" />
						</div>
					))}
				</div>
			)}
		</div>
	)
}
