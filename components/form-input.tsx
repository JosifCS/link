"use client"

import { useId } from "react"
import { useFormContext } from "./form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string
}

export function FormInput({
	label,
	defaultValue,
	name,
	...props
}: FormInputProps) {
	const form = useFormContext()
	const id = useId()

	return (
		<div className="grid w-full items-center gap-1.5">
			{label && <Label htmlFor={id}>{label}</Label>}
			<Input
				id={id}
				name={name}
				defaultValue={
					props.type == "file"
						? undefined
						: (form.prevState?.[name ?? "x"] ?? defaultValue)
				}
				{...props}
			/>
			{name && form.validationErrors?.[name] && (
				<small className="text-red-700">
					{form.validationErrors[name]}
				</small>
			)}
		</div>
	)
}
