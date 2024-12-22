import * as os from "oci-objectstorage"
import * as common from "oci-common"
import { v4 as uuidv4 } from "uuid"
import * as st from "stream"
import * as fs from "fs"

// Načtěte konfiguraci z environment variables
const ociConfigContent = process.env.OCI_CONFIG
const ociCertContent = process.env.OCI_CERT

if (!fs.existsSync("/temp")) fs.mkdirSync("/temp")

const certPath = "/temp/oci-cert.pem"
fs.writeFileSync(certPath, ociCertContent!)

const configPath = "/temp/oci-config"
fs.writeFileSync(configPath, ociConfigContent!)

const provider: common.ConfigFileAuthenticationDetailsProvider =
	new common.ConfigFileAuthenticationDetailsProvider(configPath)

const client = new os.ObjectStorageClient({
	authenticationDetailsProvider: provider,
})

const bucket: string = "link-bucket"

export async function saveFile(file: File) {
	const fileName = uuidv4()
	try {
		const request: os.requests.GetNamespaceRequest = {}
		const response = await client.getNamespace(request)
		const namespace = response.value

		const putObjectRequest: os.requests.PutObjectRequest = {
			namespaceName: namespace,
			bucketName: bucket,
			putObjectBody: Buffer.from(await file.arrayBuffer()),
			objectName: fileName,
			contentLength: file.size,
			contentType: file.type,
		}
		await client.putObject(putObjectRequest)
	} catch (error) {
		console.log(error)
	}

	client.close()

	return fileName
}

export async function getFile(fileUUID: string) {
	try {
		const request: os.requests.GetNamespaceRequest = {}
		const response = await client.getNamespace(request)
		const namespace = response.value

		const getObjectRequest: os.requests.GetObjectRequest = {
			objectName: fileUUID,
			bucketName: bucket,
			namespaceName: namespace,
		}
		const getObjectResponse = await client.getObject(getObjectRequest)
		return getObjectResponse.value as st.Readable
	} catch (error) {
		console.log(error)
	}

	client.close()
}
