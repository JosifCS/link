import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<SiteHeader />
			<main className="flex-1 pt-16">{children}</main>

			<footer className="bg-muted flex h-16 items-center px-4 md:px-6">
				<p className="text-sm text-gray-500 dark:text-gray-400">
					LINK –⁠⁠⁠⁠⁠⁠ Logika interakcí a navazujících konverzací
					–⁠⁠⁠⁠⁠⁠{" "}
					<Button variant={"link"} className="p-0" asChild>
						<Link
							href={"https://github.com/JosifCS/link"}
							target="_blank"
						>
							GitHub
						</Link>
					</Button>
				</p>
			</footer>
		</div>
	)
}
