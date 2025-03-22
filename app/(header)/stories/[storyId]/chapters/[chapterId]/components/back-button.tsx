import { ButtonLink } from "@/components/button-link"
import { ChevronLeft } from "lucide-react"

export function BackButton({ href, label }: { href: string; label: string }) {
	return (
		<ButtonLink
			variant="ghost"
			size="sm"
			className="w-fit gap-1 px-2"
			href={href}
		>
			<ChevronLeft className="h-4 w-4" />
			<span>{label}</span>
		</ButtonLink>
	)
}
