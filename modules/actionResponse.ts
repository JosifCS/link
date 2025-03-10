export function actionResponse(
	success: boolean,
	message?: string,
	redirect?: string
) {
	return {
		success,
		message,
		redirect,
	}
}
