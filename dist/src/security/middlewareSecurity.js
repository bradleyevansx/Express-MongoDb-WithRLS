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
exports.getPostRestrictions = void 0;
const sift_1 = __importDefault(require("sift"));
function getPostRestrictions(restrictions) {
    const response = [];
    for (const restriction of restrictions) {
        response.push(createPostMiddleware(restriction));
    }
    return response;
}
exports.getPostRestrictions = getPostRestrictions;
function createPostMiddleware(restriction) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = (0, sift_1.default)(restriction);
            const entity = req.body;
            const result = test(entity);
            if (!result) {
                res.status(403).send("Forbidden");
            }
            else {
                next();
            }
        });
    };
}
