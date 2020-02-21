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
const app = express_1.default();
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/file/', file_1.default());
app.use('/db/', db_1.default());
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