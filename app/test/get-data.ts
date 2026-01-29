import { cache } from "react"

export const getData = cache(() => {
	console.log("FETCH DATA")
	return { date: new Date().toISOString() }
})
