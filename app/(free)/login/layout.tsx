import { LoginLayout } from "@/components/login-layout"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { ReactNode } from "react"

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations()

	// optionally access and extend (rather than replace) parent metadata
	//const previousImages = (await parent).openGraph?.images || []

	return {
		title: t("Components.LoginForm.description"),
		/*openGraph: {
			images: ["/some-specific-page-image.jpg", ...previousImages],
		},*/
	}
}

export default async function Layout({ children }: { children: ReactNode }) {
	return <LoginLayout>{children}</LoginLayout>
}
