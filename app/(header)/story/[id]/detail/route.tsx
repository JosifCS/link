import { PageProps } from "@/types/global"
import { redirect } from "next/navigation"

export async function GET(request: Request, { params }: PageProps<"id">) {
	const id = (await params).id
	return redirect(`/story/${id}/detail/dashboard`)
}
