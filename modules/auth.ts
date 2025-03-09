import { auth0 } from "@/lib/auth0"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function authorize(
	redirectToLogin: boolean = true
): Promise<
	| { email: string; nickname: string; id: number; story: null }
	| { email: null; nickname: null; id: null; story: string | null }
> {
	const session = await auth0.getSession()

	if (redirectToLogin && session == null) return redirect("/auth/login")

	if (session == null) {
		const c = await cookies()
		const story = c.get("story")?.value ?? null // nepřihlášený uživatel může mít v cookies uuid pro jeden příběh
		return { email: null, nickname: null, id: null, story }
	}

	let user = await prisma.user.findFirst({
		where: { email: session.user.email },
	})

	// pokud se uživatel zrovna zaregistorval, tak si ho potřebuju přidat do vlastní databáze
	if (user == null)
		user = await prisma.user.create({
			data: { email: session.user.email! },
			select: { id: true, email: true },
		})

	return {
		email: session.user.email!,
		nickname: session.user.nickname ?? "N/A",
		id: user.id,
		story: null,
	}
}
