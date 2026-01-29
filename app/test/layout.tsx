import { getData } from "./get-data"

export default async function Layout({ children }: LayoutProps<"/test">) {
	await getData()
	console.log("RENDER LAYOUT")
	return <div>{children}</div>
}
