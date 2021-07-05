"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../lib/db"));
exports.default = () => {
    const router = (0, express_1.Router)();
    router.use('/:siteID/:hashID', async (req, res, next) => {
        let { siteID, hashID } = req.params;
        let ok = await db_1.default.get(siteID, hashID)
            .then(data => {
            if (data.href) {
                let url = new URL(data.href);
                if (!/\.now\.sh|\.vercel\.app/i.test(url.hostname)) {
                    res.redirect(url.href);
                    return true;
                }
            }
        })
            .catch(e => null)
            .finally(() => db_1.default.stop());
        if (ok) {
            return;
        }
        res.status(404);
        next();
    });
    return router;
};
//# sourceMappingURL=file.js.map