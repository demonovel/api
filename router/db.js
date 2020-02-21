"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileDB_1 = __importDefault(require("../lib/fileDB"));
exports.default = () => {
    const router = express_1.Router();
    router.all('/file/:siteID/:hashID', async (req, res, next) => {
        let { siteID, hashID } = req.params;
        let p;
        //console.log(req);
        //console.log(req.method, req.params, req.body);
        if (req.method === 'POST' || req.method === 'PUT') {
            p = fileDB_1.default.set(siteID, hashID, req.body);
        }
        else {
            p = fileDB_1.default.get(siteID, hashID);
        }
        return p
            .then(data => res.json({
            error: false,
            timestamp: Date.now(),
            data,
        }))
            .catch(e => res.status(400).json({
            error: true,
            timestamp: Date.now(),
            message: String(e),
        }));
    });
    return router;
};
//# sourceMappingURL=db.js.map