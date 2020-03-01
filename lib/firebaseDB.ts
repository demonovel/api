/**
 * Created by user on 2020/3/1.
 */

import firebase from "firebase";
import { wrapFirebaseDatabase, RealtimeDatabase } from "realtime-db-adaptor";
import { assertData, assertDBKey } from './util';
import { ISchema, IData, IDB } from './types';

const app = firebase.initializeApp({
	databaseURL: process.env.MY_DATABASE_URL,
	apiKey: process.env.MY_API_KEY,
});

let database: firebase.database.Database;
let db: RealtimeDatabase<ISchema>;

const api = <IDB>{

	async start()
	{
		if (!database)
		{
			database = app.database();
			db = wrapFirebaseDatabase<ISchema>(database);
		}
		await database.goOnline();
	},

	async stop()
	{
		if (database)
		{
			await database.goOffline();
		}
	},

	async get(siteID: string, hashID: string): Promise<IData>
	{
		assertDBKey(siteID, hashID);

		await api.start();

		return db.get([siteID, hashID])
			.then(data => {
				if (!data)
				{
					return Promise.reject(`'${siteID}' '${hashID}' data is not exists`)
				}

				return data
			})
	},
	async set(siteID: string, hashID: string, data: IData): Promise<IData>
	{
		assertDBKey(siteID, hashID);
		assertData(data);

		await api.start();

		// @ts-ignore
		return db.set([siteID, hashID], data)
			.then(e => data)
	},

};

export default api