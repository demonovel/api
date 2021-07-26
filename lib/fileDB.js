"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const util_1 = require("./util");
let cacheRoot = process.env.IS_REMOTE ? (0, path_1.join)('/tmp', '.cache', 'file') : (0, path_1.resolve)(__dirname, '..', '.cache', 'file');
function checkPath(targetPath) {
    return targetPath.startsWith(cacheRoot);
}
let re = /[^a-z0-9_\-]/i;
function resolvePath(siteID, hashID) {
    let targetPath = (0, path_1.resolve)(cacheRoot, siteID, hashID);
    if (!checkPath(targetPath) || re.test(siteID) || re.test(hashID)) {
        throw new Error(`不合法的請求 '${siteID}' '${hashID}'`);
    }
    return targetPath;
}
exports.default = {
    async start() { },
    async stop() { },
    async get(siteID, hashID) {
        (0, util_1.assertDBKey)(siteID, hashID);
        return (0, fs_extra_1.readJSON)(resolvePath(siteID, hashID));
    },
    async set(siteID, hashID, data, type) {
        (0, util_1.assertDBKey)(siteID, hashID);
        (0, util_1.assertData)(data, type);
        return (0, fs_extra_1.outputJSON)(resolvePath(siteID, hashID), data)
            .then(e => data);
    },
};
//# sourceMappingURL=fileDB.js.map