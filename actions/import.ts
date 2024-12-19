"use server"

import { zfd } from "zod-form-data"
import { authActionClient } from "@/modules/safe-action"
import path from "path"
import fs from "fs"
import { z } from "zod"

const schema = zfd.formData({
	schema: zfd.file(),
})

export const importSchema = authActionClient
	.schema(schema)
	.action(async function ({ parsedInput: { schema } }) {
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
