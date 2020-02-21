"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
let cacheRoot = process.env.IS_REMOTE ? path_1.join('/tmp', '.cache', 'file') : path_1.resolve(__dirname, '..', '.cache', 'file');
function checkPath(targetPath) {
    return targetPath.startsWith(cacheRoot);
}
let re = /[^a-z0-9_\-]/i;
function resolvePath(siteID, hashID) {
    let targetPath = path_1.resolve(cacheRoot, siteID, hashID);
    if (!checkPath(targetPath) || re.test(siteID) || re.test(hashID)) {
        throw new Error(`不合法的請求 '${siteID}' '${hashID}'`);
    }
    return targetPath;
}
exports.default = {
    async get(siteID, hashID) {
        return fs_extra_1.readJSON(resolvePath(siteID, hashID));
    },
    async set(siteID, hashID, data) {
        if (!data || !data.href) {
            return Promise.reject(new TypeError(`${JSON.stringify(data)} is not allow`));
        }
        return fs_extra_1.outputJSON(resolvePath(siteID, hashID), data)
            .then(e => data);
    },
};
//# sourceMappingURL=fileDB.js.map