export async function getData(page: string) {
	console.log("FETCH DATA")
	return { date: new Date().toISOString(), page }
}
