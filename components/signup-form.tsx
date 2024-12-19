import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Form } from "./form"
import { signup } from "@/actions/signup"
import { FormInput } from "./form-input"

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const t = useTranslations("Components.SignupForm")

	return (
		<Form action={signup} className="flex flex-col gap-6">
			<div className="flex flex-col items-center text-center">
				<h1 className="text-2xl font-bold">{t("title")}</h1>
				<p className="text-balance text-muted-foreground">
					{t("description")}
				</p>
			</div>
			<FormInput name="name" label={t("name")} type="text" required />
			<FormInput
				name="email"
				label={t("email")}
				type="email"
				placeholder="m@example.com"
				required
			/>
			<FormInput
				name="password"
				label={t("password")}
				type="password"
				required
			/>
			<FormInput
				name="password2"
				label={t("password2")}
				type="password"
				required
			/>
			<Button type="submit" className="w-full">
				{t("signup")}
			</Button>

			<div className="text-center text-sm">
				{t("have")}{" "}
				<Link href="/login" className="underline underline-offset-4">
					{t("login")}
				</Link>
			</div>
		</Form>
	)
}
