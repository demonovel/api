import { resolve, join } from "path";
import { readJSON, outputJSON } from 'fs-extra';

let cacheRoot = process.env.IS_REMOTE ? join('/tmp', '.cache', 'file') : resolve(__dirname, '..', '.cache', 'file');

function checkPath(targetPath: string)
{
	return targetPath.startsWith(cacheRoot)
}

let re = /[^a-z0-9_\-]/i;

function resolvePath(siteID: string, hashID: string)
{
	let targetPath = resolve(cacheRoot, siteID, hashID);

	if (!checkPath(targetPath) || re.test(siteID) || re.test(hashID))
	{
		throw new Error(`不合法的請求 '${siteID}' '${hashID}'`)
	}

	return targetPath
}

export default {
	async get(siteID: string, hashID: string)
	{
		return readJSON(resolvePath(siteID, hashID))
	},
	async set(siteID: string, hashID: string, data: any)
	{
		if (!data || !data.href)
		{
			return Promise.reject(new TypeError(`${data} is not allow`));
		}

		return outputJSON(resolvePath(siteID, hashID), data)
			.then(e => data)
			;
	},
}
