import { PageProps } from "@/types/global"
import { redirect } from "next/navigation"

export default async function Page({ params }: PageProps<"id">) {
	const id = (await params).id
	redirect(`/story/${id}/detail/dashboard`)
}
