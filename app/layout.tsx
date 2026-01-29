import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

import { ClientProviders } from "@/components/client-providers"
import { getLocale } from "next-intl/server"

// inicializace konstant
String.Empty = ""
String.CR = "\r"
String.LF = "\n"
String.CRLF = "\r\n"

const geistSans = localFont({
	src: "../assets/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
})
const geistMono = localFont({
	src: "../assets/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
})

export const metadata: Metadata = {
	title: "Link",
	description: "Logika interakcí a navazujících konverzací",
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
	const locale = await getLocale()

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<ClientProviders />
			</body>
		</html>
	)
}
