import { PageProps } from "@/types/global"
import { redirect } from "next/navigation"

export async function GET(request: Request, { params }: PageProps<"storyId">) {
	const { storyId } = await params
	return redirect(`/story/${storyId}/detail/dashboard`)
}
