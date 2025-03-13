import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Card as UiCard,
} from "./ui/card"
import { Skeleton } from "./ui/skeleton"

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
	title?: string
	description?: string
	titleSkeleton?: boolean
	desriptionSkeleton?: boolean
}

export function Card({
	title,
	description,
	titleSkeleton,
	desriptionSkeleton,
	children,
	...props
}: CardProps) {
	return (
		<UiCard {...props}>
			{title || description || titleSkeleton || desriptionSkeleton ? (
				<CardHeader>
					{title ? <CardTitle>{title}</CardTitle> : null}
					{titleSkeleton ? <Skeleton className="h-6 w-44" /> : null}
					{description ? (
						<CardDescription>{description}</CardDescription>
					) : null}
					{desriptionSkeleton ? (
						<Skeleton className="h-5 w-52" />
					) : null}
				</CardHeader>
			) : null}
			<CardContent>{children}</CardContent>
		</UiCard>
	)
}
