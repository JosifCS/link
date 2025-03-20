import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"

type FormSkeletonProps = {
	children: React.ReactNode
	className?: string
}

export function FormSkeleton({ children, className }: FormSkeletonProps) {
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			{children}

			<div className="w-full flex justify-end">
				<Skeleton className="h-10 w-24" />
			</div>
		</div>
	)
}
