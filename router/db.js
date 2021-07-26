"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../lib/db"));
const types_1 = require("../lib/types");
exports.default = () => {
    const router = (0, express_1.Router)();
    router.all('/:type/:siteID/:hashID', async (req, res, next) => {
        let { siteID, hashID, type } = req.params;
        if (!type || types_1.EnumApiType[type] !== type) {
            return res.sendStatus(403);
        }
        let p;
        //console.log(req);
        console.log(req.method, req.params, req.body);
        if (req.method === 'POST' || req.method === 'PUT') {
            p = db_1.default.set(siteID, hashID, req.body, type);
        }
        else {
            p = db_1.default.get(siteID, hashID);
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
        }))
            .finally(() => db_1.default.stop());
    });
    return router;
};
//# sourceMappingURL=db.js.map