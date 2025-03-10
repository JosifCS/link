export function actionResponse(
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
