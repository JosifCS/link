import { auth0 } from "@/lib/auth0"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

type Return = Promise<
	| { email: string; nickname: string; id: number }
	| { email: null; nickname: null; id: null }
>
export async function authorize(allowAnonymous?: boolean): Return
export async function authorize(storyId: number): Return
export async function authorize(param1?: number | boolean): Return {
	if (typeof param1 === "number") return authorizeStory(param1)
	else return authorizeAllowAnonymous(param1)
}

async function authorizeAllowAnonymous(
	allowAnonymous: boolean = false
): Return {
	const session = await auth0.getSession()

	if (session) {
		const user = await getUser(session.user.email!)
		return {
			email: user.email,
			id: user.id,
			nickname: session.user.nickname!,
		}
	}

	if (allowAnonymous) {
		return {
			email: null,
			id: null,
			nickname: null,
		}
	}

	redirect("/auth/login")
}

async function authorizeStory(storyId: number): Return {
	const story = await prisma.story.findFirst({ where: { id: storyId } })

	// neexistující příběh
	if (story == null) return notFound()

	const session = await auth0.getSession()

	const c = await cookies()
	const storyUuid = c.get("story")?.value ?? null

	// nejsem přihlášený, příběh je anonymní a já mám v cookies jeho uuid
	if (session == null && story.createdById == null && storyUuid == story.uuid)
		return { email: null, id: null, nickname: null }

	// jsem přihlášený
	if (session) {
		const user = await getUser(session.user.email!)

		// ... a příběh je můj
		if (user.id == story.createdById) {
			return {
				email: user.email,
				id: user.id,
				nickname: session.user.nickname!,
			}
		}
	}

	return notFound()
}

async function getUser(email: string) {
	let user = await prisma.user.findFirst({
		where: { email: { equals: email } },
	})

	// pokud se uživatel zrovna zaregistorval, tak si ho potřebuju přidat do vlastní databáze
	if (user == null)
		user = await prisma.user.create({
			data: { email: email },
			select: { id: true, email: true },
		})

	return user
}
