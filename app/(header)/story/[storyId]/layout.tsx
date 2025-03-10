import { authorize } from "@/modules/auth"
import { ReactNode } from "react"

export default async function Layout({
	children,
	params,
}: {
	children: ReactNode
	params: Promise<{ storyId: string }>
}) {
	const id = (await params).storyId

	await authorize(+id)

	return <>{children}</>
}
