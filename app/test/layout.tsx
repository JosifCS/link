import { ReactNode } from "react"
import { getData } from "./get-data"

export default async function Layout({ children }: { children: ReactNode }) {
	await getData("page")
	console.log("RENDER LAYOUT")
	return <div>{children}</div>
}
