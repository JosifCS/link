import { z } from "zod"
import { ActionResult } from "./actionResult"

export type SafeActionResult = {
	result: ActionResult
	prevState: any | null
	validationErrors: Record<string, string>
}

export function safeAction<S extends object, SchemaType extends z.ZodTypeAny>(
	schema: z.ZodEffects<SchemaType, any, any>,
	action: (data: z.output<SchemaType>) => Promise<ActionResult>
) {
	return async function handler(currentState: S, formData: FormData) {
		console.log(currentState, formData)
		const { success, data, error } = schema.safeParse(formData)
		console.log(error?.flatten())
		try {
			const result = await action(data)

			return {
				prevState: parseForm(formData),
				validationErrors: formatError(error),
				result,
			}
		} catch (e: unknown) {
			console.log("ERRRROR-----------")
		}

		return {
			prevState: parseForm(formData),
			validationErrors: formatError(error),
			result: {
				success,
			},
		}
	}
}

function parseForm(formData: FormData) {
	var object: any = {}
	formData.forEach((value, key) => {
		// přeskakuji data doplněná reactem
		if (key.at(0) == "$") return

		// Reflect.has in favor of: object.hasOwnProperty(key)
		if (!Reflect.has(object, key)) {
			object[key] = value
			return
		}
		if (!Array.isArray(object[key])) {
			object[key] = [object[key]]
		}
		object[key].push(value)
	})
	return object
}

function formatError(errors: z.ZodError<z.input<any>> | undefined) {
	let object: any = {}

	errors?.errors.forEach((error) => {
		object[error.path.at(0) ?? ""] = error.message
	})

	return object
}
