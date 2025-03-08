import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenLine, Upload, LogIn } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function Home() {
	const t = await getTranslations("Welcome")
	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b">
				<div className="flex h-16 items-center justify-between px-4 md:px-6">
					<Link
						href="/"
						className="flex items-center gap-2 text-lg font-semibold"
					>
						<PenLine className="h-6 w-6" />
						<span>LINK</span>
					</Link>
					<Button variant="ghost" size="sm" className="gap-2" asChild>
						<Link href="/login">
							<LogIn className="h-4 w-4" />
							<span>{t("login")}</span>
						</Link>
					</Button>
				</div>
			</header>
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
									{t("title")}
								</h1>
								<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
									{t("description")}
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Button className="gap-2" asChild>
									<Link href={"/story"}>
										<PenLine className="h-4 w-4" />
										<span>{t("create")}</span>
									</Link>
								</Button>
								<Button
									variant="outline"
									className="gap-2"
									asChild
								>
									<Link href={"/import"}>
										<Upload className="h-4 w-4" />
										<span>{t("import")}</span>
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h3 className="text-xl font-bold">
										{t("simple")}
									</h3>
									<p className="text-gray-500 dark:text-gray-400">
										{t("simpleDesc")}
									</p>
								</div>
							</div>
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h3 className="text-xl font-bold">
										{t("export")}
									</h3>
									<p className="text-gray-500 dark:text-gray-400">
										{t("exportDesc")}
									</p>
								</div>
							</div>
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h3 className="text-xl font-bold">
										{t("more")}
									</h3>
									<p className="text-gray-500 dark:text-gray-400">
										{t("moreDesc")}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="border-t">
				<div className="container flex h-16 items-center px-4 md:px-6">
					<p className="text-sm text-gray-500 dark:text-gray-400">
						LINK –⁠⁠⁠⁠⁠⁠ Logika interakcí a navazujících konverzací
						–⁠⁠⁠⁠⁠⁠{" "}
						<Button variant={"link"} className="p-0" asChild>
							<Link
								href={"https://github.com/JosifCS/link"}
								target="_blank"
							>
								GitHub
							</Link>
						</Button>
					</p>
				</div>
			</footer>
		</div>
	)
}
