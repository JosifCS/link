export function urlSource(sourceUrl: string) {
	const usp = new URLSearchParams()
	usp.append("source", sourceUrl)
	return usp.toString()
}
