import { auth0 } from "@/lib/auth0"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type Return = Promise<
	| { email: string; nickname: string; id: number; storyAuthorized: boolean }
	| { email: null; nickname: null; id: null; storyAuthorized: boolean }
>
export async function authorize(allowAnonymous?: boolean): Return
export async function authorize(story: {
	createdById: number | null
	uuid: string
}): Return
export async function authorize(
	param1?: { createdById: number | null; uuid: string } | boolean
): Return {
	const session = await auth0.getSession()

	if (session == null) {
		if (typeof param1 == "object") {
			const c = await cookies()
			const storyUuid = c.get("story")?.value ?? null // nepřihlášený uživatel může mít v cookies uuid pro jeden příběh
			return {
				email: null,
				nickname: null,
				id: null,
				storyAuthorized: storyUuid == param1.uuid, // jako nepřihlášený uživatel jsem autorizovaný pro tento příběh
			}
		}
		if (param1) {
			return {
				email: null,
				nickname: null,
				id: null,
				storyAuthorized: false, // v parametru nebyl příběh, takže pro příběh jsem neautorizovaný
			}
		}

		return redirect("/auth/login")
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

	if (typeof param1 == "object") {
		return {
			email: session.user.email!,
			nickname: session.user.nickname ?? "N/A",
			id: user.id,
			storyAuthorized: param1.createdById == user.id, // můžu zobrazit pouze svůj příběh
		}
	}

	return {
		email: session.user.email!,
		nickname: session.user.nickname ?? "N/A",
		id: user.id,
		storyAuthorized: false, // v parametru nebyl příběh, takže pro příběh jsem neautorizovaný
	}
}
