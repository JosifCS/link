"use client"

import { createContext, useActionState, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { ActionResult } from "@/modules/safe-action"

type FormWrapper = {
	action: any
	children: React.ReactNode
	className?: string
}

type FormResult = ActionResult & {
	prevState: any | null
	validationErrors: Record<string, string>
}

const FormContext = createContext<FormResult>({
	prevState: null,
	validationErrors: {},
	success: true,
})

export const useFormContext = () => useContext(FormContext)

export function Form({ action, children, className }: FormWrapper) {
	const router = useRouter()
	const [state, formAction, isPending] = useActionState<FormResult>(action, {
		prevState: null,
		validationErrors: {},
		success: true,
	})

	useEffect(() => {
		if (state.success) {
			if (state.message) {
				toast({
					title: "Success",
					description: state.message,
				})

				/*else {
					toast({
						variant: "error",
						title: "Error",
						description: data.message,
					})
				}*/
			}

			if (state.redirect) {
				router.push(state.redirect)
			} /*else {
				router.back()
			}*/
		} /*else if (typeof result.serverError === "string") {
			toast({
				variant: "error",
				title: "Server error",
				description: result.serverError,
			})
		}*/ else if (state.validationErrors) {
			toast({
				variant: "error",
				title: "Validation error",
				description: "Invalid form",
			})
		}
	}, [state])

	return (
		<form
			action={formAction}
			className={cn("flex flex-col gap-4", className)}
			autoComplete="off"
		>
			<FormContext.Provider
				value={{
					prevState: state.prevState,
					validationErrors: state.validationErrors,
					success: state.success,
				}}
			>
				{children}
			</FormContext.Provider>
		</form>
	)
}
