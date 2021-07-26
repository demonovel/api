/**
 * Created by user on 2020/3/2.
 */
import { EnumApiType } from './types';
export declare function invalidKey(key: string): boolean;
export declare function assertDBKey(siteID: string, hashID: string): void;
export declare function assertData(data: any, type: EnumApiType): void;
