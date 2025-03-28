import { BookOpen, PenLine } from "lucide-react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { authorize } from "@/modules/auth"
import { UserMenu } from "./user-menu"
import { ButtonLink } from "./button-link"

export async function SiteHeader() {
	const { nickname } = await authorize(true)

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
				{nickname && (
					<div className="flex">
						<ButtonLink
							variant="ghost"
							size="sm"
							className="gap-2"
							href="/stories"
						>
							<BookOpen className="mr-2 h-4 w-4" />
							<span>{t("stories")}</span>
						</ButtonLink>
					</div>
				)}
				<UserMenu />
			</div>
		</header>
	)
}
