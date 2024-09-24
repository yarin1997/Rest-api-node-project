"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cardRoutes_1 = __importDefault(require("./routes/cardRoutes"));
const dotenv = __importStar(require("dotenv"));
const moment_1 = __importDefault(require("moment"));
const chalk_1 = __importDefault(require("chalk"));
const errorRoute_1 = __importDefault(require("./routes/errorRoute"));
const app = (0, express_1.default)();
dotenv.config();
const port = process.env.Port || 5000;
// Dwon are Middleware:
app.use(express_1.default.json());
app.use((0, morgan_1.default)((tokens, req, res) => {
    const status = tokens.status(req, res);
    if (!status)
        return;
    return [
        console.log(chalk_1.default.blue(tokens.method(req, res))),
        console.log(tokens.url(req, res)),
        +status >= 200 && +status < 400 ? (tokens.status(req, res)) : (tokens.status(req, res)),
        console.log((0, moment_1.default)().format("YYYY-MM-DD HH:mm")),
        console.log(tokens['response-time'](req, res), 'ms'),
    ].join(' ');
}));
app.use((0, cors_1.default)({
    origin: "*",
    methods: 'GET,PUT,POST,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));
// Basic ROUTE
app.get('/', (req, res) => {
    res.send('Hello World');
});
//  ROUTE
app.use('/api', userRoutes_1.default);
app.use('/api', cardRoutes_1.default);
app.use(express_1.default.static('public'));
app.use(errorRoute_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    console.log(`Server running on port ${port}`);
}));
//# sourceMappingURL=server.js.map