import { authorize } from "@/modules/auth"
import { getLocale, getTranslations } from "next-intl/server"
import { Button } from "./ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { LogIn, User } from "lucide-react"
import { setLocale } from "@/actions/set-locale"

export async function UserMenu() {
	const { nickname } = await authorize(false)
	const t = await getTranslations("Components.UserMenu")
	const locale = await getLocale()

	if (nickname)
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm" className="gap-2">
						<User className="h-4 w-4" />
						<span>{nickname}</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end">
					<DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>{t("profile")}</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/auth/logout">{t("logout")}</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								{t("language")}
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuRadioGroup
										value={locale}
										onValueChange={setLocale}
									>
										<DropdownMenuRadioItem value="cs">
											Česky
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="en">
											English
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		)

	return (
		<Button variant="ghost" size="sm" className="gap-2" asChild>
			<Link href="/auth/login">
				<LogIn className="h-4 w-4" />
				<span>{t("login")}</span>
			</Link>
		</Button>
	)
}
