declare const _default: {
    get(siteID: string, hashID: string): Promise<any>;
    set(siteID: string, hashID: string, data: object): Promise<object>;
};
export default _default;
