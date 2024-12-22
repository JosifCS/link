"use server"

import { zfd } from "zod-form-data"
import path from "path"
import fs from "fs"
import { z } from "zod"
import { safeAction } from "@/modules/safe-action"
import { saveFile } from "@/modules/file-api"

const schema = zfd.formData({
	schema: zfd.file(),
})

const schema1 = zfd
	.formData({
		schema: zfd.file(),
	})
	.refine((data) => data.schema, {
		message: "Passwords do not match",
	})

export const importSchema = safeAction(schema, async function ({ schema }) {
	await saveFile(schema)

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
