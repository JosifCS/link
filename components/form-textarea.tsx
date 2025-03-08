"use client"

import { useId } from "react"
import { useFormContext } from "./form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

type FormTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
	label?: string
	rows?: number
}

export function FormTextArea({
	label,
	defaultValue,
	name,
	...props
}: FormTextAreaProps) {
	const form = useFormContext()
	const id = useId()

	return (
		<div className="grid w-full items-center gap-1.5">
			{label && <Label htmlFor={id}>{label}</Label>}
			<Textarea
				id={id}
				name={name}
				defaultValue={
					props.type == "file"
						? undefined
						: (form.prevState?.[name ?? "x"] ?? defaultValue)
				}
				onChange={form.onChange}
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
