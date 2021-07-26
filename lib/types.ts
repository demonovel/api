/**
 * Created by user on 2020/3/2.
 */

export interface IData extends Record<string, any>
{
	href?: string;
}

export interface ISchema
{
	[siteID: string]: ISchemaSiteID;
}

export interface ISchemaSiteID
{
	[hashID: string]: IData;
}

export interface ISchemaHashID extends IData
{

}

export declare interface IDB
{
	start(): Promise<unknown>;
	stop(): Promise<unknown>;

	get(siteID: string, hashID: string): Promise<IData>;
	set(siteID: string, hashID: string, data: IData, type: EnumApiType): Promise<IData>;
}

export enum EnumApiType
{
	file = 'file',
	raw = 'raw',
}
