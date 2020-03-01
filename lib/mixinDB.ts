import { IDB, IData } from './types';
import firebaseDB from './firebaseDB';
import fileDB from './fileDB';

export default <IDB>{

	async start()
	{
		return Promise.all([
			firebaseDB.start && firebaseDB.start().then(e => console.error(e)),
			fileDB.start && fileDB.start().then(e => console.error(e)),
		])
	},

	async stop()
	{
		return Promise.all([
			firebaseDB.stop && firebaseDB.stop().then(e => console.error(e)),
			fileDB.stop && fileDB.stop().then(e => console.error(e)),
		])
	},

	get(siteID: string, hashID: string): Promise<IData>
	{
		return firebaseDB.get(siteID, hashID)
			.catch(e => {
				console.warn(e);
				return fileDB.get(siteID, hashID)
			})
	},
	set(siteID: string, hashID: string, data: IData): Promise<IData>
	{
		return firebaseDB.set(siteID, hashID, data)
			.catch(e => {
				console.warn(e);
				return fileDB.set(siteID, hashID, data)
			})
	},
}
