/**
 * Created by user on 2020/3/2.
 */

import { AssertionError } from 'assert';

let re = /[^a-z0-9_\-]/i;

export function invalidKey(key: string)
{
	return re.test(key)
}

export function assertDBKey(siteID: string, hashID: string)
{
	if (invalidKey(siteID) || invalidKey(hashID))
	{
		throw new AssertionError({
			message: `不合法的請求 '${siteID}' '${hashID}'`,
		})
	}
}

export function assertData(data)
{
	if (!data || !data.href)
	{
		throw new AssertionError({
			message: `${JSON.stringify(data)} is not allow`,
		})
	}
}
