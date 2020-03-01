import express, { Router } from 'express';
import { readJSON } from 'fs-extra';
import { resolve } from 'path';
import siteDB from '../lib/db';

export default () =>
{
	const router = Router();

	router.all('/file/:siteID/:hashID', async (req, res, next) =>
	{
		let { siteID, hashID } = req.params;

		let p: Promise<any>;

		//console.log(req);
		//console.log(req.method, req.params, req.body);

		if (req.method === 'POST' || req.method === 'PUT')
		{
			p = siteDB.set(siteID, hashID, req.body)
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
