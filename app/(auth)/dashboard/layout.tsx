import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {
	//const t = await getTranslations("Index")
	return <main className="space-y-6">{children}</main>
}
