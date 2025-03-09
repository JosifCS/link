import { auth0 } from "@/lib/auth0"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default async function RootLayout({
	children,
	rootDialogs,
}: Readonly<{
	children: ReactNode
	rootDialogs: ReactNode
}>) {
	const session = await auth0.getSession()

	if (session == null) redirect("/auth/login")

	return (
		<>
			<div className="mt-10 bg-background h-full px-4 py-6 lg:px-8">
				{children}
			</div>
			{rootDialogs}
		</>
	)
}
