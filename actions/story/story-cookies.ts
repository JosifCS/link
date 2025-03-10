"use server"

import { cookies } from "next/headers"

export async function setStoryCookie(uuid: string) {
	const expires = new Date()
	expires.setDate(expires.getDate() + 7)

	const c = await cookies()

	c.set("story", uuid, { expires })
	c.set("story-expire", expires.toISOString(), { expires })
}

export async function getStoryCookie() {
	const c = await cookies()
	const uuid = c.get("story")?.value
	const e = c.get("story-expire")?.value

	if (uuid && e) {
		const expire = new Date(e)
		if (new Date() < expire) return { uuid, expire }
	}

	return null
}
