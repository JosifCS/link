import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ReactNode } from "react"

export function LoginLayout({ children }: { children?: ReactNode }) {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<div className={"flex flex-col gap-6"}>
					<Card className="overflow-hidden">
						<CardContent className="grid p-0 md:grid-cols-2">
							<div className="p-6 md:p-8">{children}</div>
							<div className="relative hidden bg-muted md:block">
								<Image
									fill
									src="/login.jpg"
									alt="Ilustrative image in login form"
									className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
								/>
							</div>
						</CardContent>
					</Card>
					{/*
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				By clicking continue, you agree to our{" "}
				<a href="#">Terms of Service</a> and{" "}
				<a href="#">Privacy Policy</a>.
			</div>
			 */}
				</div>
			</div>
		</div>
	)
}