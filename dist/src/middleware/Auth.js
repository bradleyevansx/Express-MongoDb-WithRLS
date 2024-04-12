"use strict";
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
exports.jwtMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cookie = req.headers.cookie;
    if (!cookie)
        return res.status(401).send("Access Denied");
    try {
        const verified = jsonwebtoken_1.default.verify((_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=")[1], process.env.JWT_SECRET);
        req.headers.userId = verified.userId;
        req.headers.role = verified.role;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(400).send("Invalid Token");
    }
});
exports.jwtMiddleware = jwtMiddleware;
