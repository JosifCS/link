import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {
	await getData("page")
	console.log("RENDER LAYOUT")
	return <div>{children}</div>
}

export async function getData(page: string) {
	console.log("FETCH DATA")
	return { date: new Date().toISOString(), page }
}
