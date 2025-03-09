import { BookOpen, LogIn, PenLine, User } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { getTranslations } from "next-intl/server"
import { auth0 } from "@/lib/auth0"

export async function SiteHeader() {
	const session = await auth0.getSession()

	const t = await getTranslations("Components.SiteHeader")

	return (
		<header className="border-b fixed top-0 left-0 right-0 z-50 bg-background">
			<div className="flex h-16 items-center justify-between px-4 md:px-6">
				<Link
					href="/"
					className="flex items-center gap-2 text-lg font-semibold"
				>
					<PenLine className="h-6 w-6" />
					<span>LINK</span>
				</Link>
				{session && (
					<div className="flex">
						<Button
							variant="ghost"
							size="sm"
							className="gap-2"
							asChild
						>
							<Link href="/stories">
								<BookOpen className="mr-2 h-4 w-4" />
								<span>Příběhy</span>
							</Link>
						</Button>
					</div>
				)}
				{session ? (
					<Button variant="ghost" size="sm" className="gap-2" asChild>
						<Link href="/l">
							<User className="h-4 w-4" />
							<span>Profil</span>
						</Link>
					</Button>
				) : (
					<Button variant="ghost" size="sm" className="gap-2" asChild>
						<Link href="/auth/login">
							<LogIn className="h-4 w-4" />
							<span>{t("login")}</span>
						</Link>
					</Button>
				)}
			</div>
		</header>
	)
}
