export type ActionResult = {
	success: boolean
	message?: string
	redirect?: string
}

export function actionResult(
	success: boolean,
	message?: string,
	redirect?: string
) {
	console.log("Action return:", success, message, redirect)
	return {
		success,
		message,
		redirect,
	}
}
