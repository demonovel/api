import express, { Router } from 'express';
import { readJSON } from 'fs-extra';
import { resolve } from 'path';
import siteDB from '../lib/db';
import { EnumApiType } from '../lib/types';

export default () =>
{
	const router = Router();

	router.all('/:type/:siteID/:hashID', async (req, res, next) =>
	{
		let { siteID, hashID, type } = req.params;

		if (!type || EnumApiType[type] !== type)
		{
			return res.sendStatus(403);
		}

		let p: Promise<any>;

		//console.log(req);
		console.log(req.method, req.params, req.body);

		if (req.method === 'POST' || req.method === 'PUT')
		{
			p = siteDB.set(siteID, hashID, req.body, type as EnumApiType)
		}
		else
		{
			p = siteDB.get(siteID, hashID)
		}

		return p
			.then(data => res.json({
				error: false,
				timestamp: Date.now(),
				data,
			}))
			.catch(e => res.status(400).json({
				error: true,
				timestamp: Date.now(),
				message: String(e),
			}))
			.finally(() => siteDB.stop())
		;
	});

	return router
}
