"use strict";
/**
 * Created by user on 2020/3/2.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertData = exports.assertDBKey = exports.invalidKey = void 0;
const assert_1 = require("assert");
let re = /[^a-z0-9_\-]/i;
function invalidKey(key) {
    return re.test(key);
}
exports.invalidKey = invalidKey;
function assertDBKey(siteID, hashID) {
    if (invalidKey(siteID) || invalidKey(hashID)) {
        throw new assert_1.AssertionError({
            message: `不合法的請求 '${siteID}' '${hashID}'`,
        });
    }
}
exports.assertDBKey = assertDBKey;
function assertData(data) {
    if (!data || !data.href) {
        throw new assert_1.AssertionError({
            message: `${JSON.stringify(data)} is not allow`,
        });
    }
}
exports.assertData = assertData;
//# sourceMappingURL=util.js.map