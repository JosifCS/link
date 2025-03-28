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
	disabled,
	...props
}: ButtonLinkProps) {
	return (
		<Button
			type="button"
			{...props}
			asChild={!disabled}
			disabled={disabled}
		>
			{disabled ? (
				children
			) : (
				<Link href={href} target={target}>
					{children}
				</Link>
			)}
		</Button>
	)
}
