"use server"

import { zfd } from "zod-form-data"
import { authActionClient } from "@/modules/safe-action"
import path from "path"
import fs from "fs"
import { z } from "zod"

const schema = zfd.formData({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	email: z.string().email({ message: "Please enter a valid email." }).trim(),
	password: z
		.string()
		.min(8, { message: "Be at least 8 characters long" })
		.regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
		.regex(/[0-9]/, { message: "Contain at least one number." })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Contain at least one special character.",
		})
		.trim(),
	password2: z.string().trim(),
})

export const signup = authActionClient.schema(schema).action(async function ({
	parsedInput: { email, password, password2 },
}) {
	//await saveFile(report)

	/*const json = broker == "portu" ? await csvToJson(report) : null

		if (json == null) throw new NotImplementedError("Broker.")

		const data = ReportBuilder.build(json, portuSchema as ReportSchema)

		// TODO univerzální ukládání
		const filePath = path.join(process.cwd(), "data", "data.json")
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")*/

	return {
		success: true,
		message: "ok",
		//redirect: `/dashboard/reports`, // TODO reálně se můžu vracet na různé stránky, protože dialog je přístupný všude
	}
})
