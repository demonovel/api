"use strict";
/**
 * Created by user on 2020/3/1.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("firebase"));
const realtime_db_adaptor_1 = require("realtime-db-adaptor");
const util_1 = require("./util");
const app = firebase_1.default.initializeApp({
    databaseURL: process.env.MY_DATABASE_URL,
    apiKey: process.env.MY_API_KEY,
});
let database;
let db;
const api = {
    async start() {
        if (!database) {
            database = app.database();
            db = realtime_db_adaptor_1.wrapFirebaseDatabase(database);
        }
        await database.goOnline();
    },
    async stop() {
        if (database) {
            await database.goOffline();
        }
    },
    async get(siteID, hashID) {
        util_1.assertDBKey(siteID, hashID);
        await api.start();
        return db.get([siteID, hashID])
            .then(data => {
            if (!data) {
                return Promise.reject(`'${siteID}' '${hashID}' data is not exists`);
            }
            return data;
        });
    },
    async set(siteID, hashID, data) {
        util_1.assertDBKey(siteID, hashID);
        util_1.assertData(data);
        await api.start();
        // @ts-ignore
        return db.set([siteID, hashID], data)
            .then(e => data);
    },
};
exports.default = api;
//# sourceMappingURL=firebaseDB.js.map