"use client"

import { useId } from "react"
import { useFormContext } from "./form"
import { Label } from "./ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"
import { Translations } from "@/types/global"

type FormSelectProps = {
	label?: string
	value?: string
	defaultValue?: string
	options: { value: string; label?: string }[]
	name?: string
	placeholder?: string
	className?: string
	translations?: Translations
	onChange?: (value: string) => void
}

export function FormSelect({
	label,
	options,
	placeholder,
	translations: t,
	name,
	onChange,
	...props
}: FormSelectProps) {
	const form = useFormContext()
	const id = useId()

	return (
		<div className="grid w-full items-center gap-1.5">
			{label && <Label htmlFor={id}>{label}</Label>}
			<Select
				name={name}
				onValueChange={
					onChange
						? (v) => {
								form.onChange()
								onChange(v)
							}
						: form.onChange
				}
				{...props}
			>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((x) => (
						<SelectItem key={x.value} value={x.value}>
							{x.label ?? (t ? t(x.value as any) : x.value)}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{name && form.validationErrors?.[name] && (
				<small className="text-red-700">
					{form.validationErrors[name]}
				</small>
			)}
		</div>
	)
}
