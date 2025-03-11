import { authorize } from "@/modules/auth"
import { ReactNode } from "react"

export default async function Layout({
	children,
	dialogs,
	params,
}: {
	children: ReactNode
	dialogs: ReactNode
	params: Promise<{ storyId: string }>
}) {
	const id = (await params).storyId

	await authorize(+id)

	return (
		<>
			{children}

			{dialogs}
		</>
	)
}
