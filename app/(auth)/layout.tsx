import { TopMenu } from "@/components/top-menu"
import {
	AccessTokenError,
	getAccessToken,
	getSession,
} from "@auth0/nextjs-auth0"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

/*export const metadata: Metadata = {
	title: "Helenka",
	description:
		"Hospodářská evidence likvidity, evidence nákladů a kontrola aktiv",
}*/

export default async function RootLayout({
	children,
	rootDialogs,
}: Readonly<{
	children: ReactNode
	rootDialogs: ReactNode
}>) {
	try {
		const _ = await getAccessToken()
	} catch (e: unknown) {
		if (e instanceof AccessTokenError) redirect("/api/auth/login")
	}

	return (
		<>
			<TopMenu />
			<div className="mt-10 bg-background h-full px-4 py-6 lg:px-8">
				{children}
			</div>
			{rootDialogs}
		</>
	)
}
