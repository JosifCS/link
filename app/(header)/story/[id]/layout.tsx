import { authorize } from "@/modules/auth"
import { ReactNode } from "react"

export default async function Layout({
	children,
	params,
}: {
	children: ReactNode
	params: Promise<{ id: string }>
}) {
	const id = (await params).id

	await authorize(+id)

	return <>{children}</>
}
