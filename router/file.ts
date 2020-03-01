import express, { Router } from 'express';
import { readJSON } from 'fs-extra';
import { resolve } from 'path';
import siteDB from '../lib/db';

export default () =>
{
	const router = Router();

	router.use('/:siteID/:hashID', async (req, res, next) =>
	{
		let { siteID, hashID } = req.params;

		let ok = await siteDB.get(siteID, hashID)
			.then(data =>
			{
				if (data.href)
				{
					let url = new URL(data.href);

					if (!url.hostname.includes('.now.sh'))
					{
						res.redirect(url.href);
						return true;
					}
				}
			})
			.catch(e => null)
			.finally(() => siteDB.stop())
		;

		if (ok)
		{
			return;
		}

		res.status(404);
		next();
	});

	return router
}
