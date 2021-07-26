"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_1 = __importDefault(require("./router/file"));
const db_1 = __importDefault(require("./router/db"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/file/', (0, file_1.default)());
app.use('/db/', (0, db_1.default)());
app.use('/env', (req, res, next) => {
    let data = Object.entries(process.env)
        .reduce((a, [k, v]) => {
        if (!/^npm_(?:config|package|lifecycle)_/i.test(k)) {
            a[k] = v === null || v === void 0 ? void 0 : v.length;
        }
        return a;
    }, {});
    res.contentType('json');
    res.end(JSON.stringify({
        timestamp: Date.now(),
        data,
    }, null, 2));
});
app.use('/*', (req, res, next) => {
    let { path, baseUrl } = req;
    res.status(404).json({
        error: true,
        timestamp: Date.now(),
        baseUrl,
        path,
    });
});
exports.default = app;
//# sourceMappingURL=index.js.map