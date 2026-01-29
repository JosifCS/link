import { authorize } from "@/modules/auth"

export default async function Layout({
	children,
	dialogs,
	params,
}: LayoutProps<"/stories/[storyId]">) {
	const id = (await params).storyId

	await authorize(+id)

	return (
		<>
			{children}

			{dialogs}
		</>
	)
}
