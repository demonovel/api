import express, { Router } from 'express';
import { readJSON } from 'fs-extra';
import { resolve } from 'path';
import fileDB from '../lib/fileDB';

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
			p = fileDB.set(siteID, hashID, req.body)
		}
		else
		{
			p = fileDB.get(siteID, hashID)
		}

		return p
			.then(data => res.json({
				timestamp: Date.now(),
				error: false,
				data,
			}))
			.catch(e => res.status(400).json({
				error: true,
				message: String(e),
				timestamp: Date.now(),
			}))
		;
	});

	return router
}
