"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseDB_1 = __importDefault(require("./firebaseDB"));
const fileDB_1 = __importDefault(require("./fileDB"));
exports.default = {
    async start() {
        return Promise.all([
            firebaseDB_1.default.start && firebaseDB_1.default.start().then(e => console.error(e)),
            fileDB_1.default.start && fileDB_1.default.start().then(e => console.error(e)),
        ]);
    },
    async stop() {
        return Promise.all([
            firebaseDB_1.default.stop && firebaseDB_1.default.stop().then(e => console.error(e)),
            fileDB_1.default.stop && fileDB_1.default.stop().then(e => console.error(e)),
        ]);
    },
    get(siteID, hashID) {
        return firebaseDB_1.default.get(siteID, hashID)
            .catch(e => {
            console.warn(e);
            return fileDB_1.default.get(siteID, hashID);
        });
    },
    set(siteID, hashID, data) {
        return firebaseDB_1.default.set(siteID, hashID, data)
            .catch(e => {
            console.warn(e);
            return fileDB_1.default.set(siteID, hashID, data);
        });
    },
};
//# sourceMappingURL=mixinDB.js.map