import { auth0 } from "@/lib/auth0"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function authorize(
	redirectToLogin: boolean = true
): Promise<
	{ email: string; nickname: string } | { email: null; nickname: null }
> {
	const session = await auth0.getSession()

	if (redirectToLogin && session == null) return redirect("/auth/login")

	if (session == null) return { email: null, nickname: null }

	const user = await prisma.user.findFirst({
		where: { email: session.user.email },
	})

	// pokud se uživatel zrovna zaregistorval, tak si ho potřebuju přidat do vlastní databáze
	if (user == null)
		await prisma.user.create({ data: { email: session.user.email! } })

	return {
		email: session.user.email!,
		nickname: session.user.nickname ?? "N/A",
	}
}
