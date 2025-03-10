import { PageProps } from "@/types/global"

export default async function Page({ params }: PageProps<"tab">) {
	const tab = (await params).tab

	return <div>TAB: {tab}</div>
}
