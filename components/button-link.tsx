import Link from "next/link"
import { Button, ButtonProps } from "./ui/button"
import { HTMLAttributeAnchorTarget } from "react"

type ButtonLinkProps = ButtonProps & {
	href: string
	target?: HTMLAttributeAnchorTarget | undefined
}

export function ButtonLink({
	href,
	children,
	target,
	...props
}: ButtonLinkProps) {
	return (
		<Button type="button" {...props} asChild>
			<Link href={href} target={target}>
				{children}
			</Link>
		</Button>
	)
}
