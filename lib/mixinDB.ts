import { IDB, IData } from './types';
import firebaseDB from './firebaseDB';
import fileDB from './fileDB';

export default <IDB>{

	async start()
	{
		return Promise.all([
			firebaseDB.start && firebaseDB.start().catch(e => console.error(`db.start.firebase`, e)),
			fileDB.start && fileDB.start().catch(e => console.error(`db.start.file`, e)),
		])
	},

	async stop()
	{
		return Promise.all([
			firebaseDB.stop && firebaseDB.stop().catch(e => console.error(`db.start.firebase`, e)),
			fileDB.stop && fileDB.stop().catch(e => console.error(`db.start.file`, e)),
		])
	},

	get(siteID: string, hashID: string): Promise<IData>
	{
		return firebaseDB.get(siteID, hashID)
			.catch(e => {
				console.warn(`db.get`, siteID, hashID, e);
				return fileDB.get(siteID, hashID)
			})
	},

	async set(siteID: string, hashID: string, data: IData): Promise<IData>
	{
		let value = await firebaseDB.set(siteID, hashID, data)
			.catch(e => {
				console.warn(`db.set`, siteID, hashID, e);
			})
		;

		let p = fileDB.set(siteID, hashID, data)

		if (typeof value === 'undefined')
		{
			return p
		}

		p = p.catch(e => null);

		return value
	},
}
