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
exports.getUsersRouter = void 0;
const UsersRepository_1 = __importDefault(require("../../../repositories/UsersRepository"));
const getRouter_1 = require("../getRouter");
function getUsersRouter(rowLevelPolicies) {
    return __awaiter(this, void 0, void 0, function* () {
        const { router, repository } = yield (0, getRouter_1.getRouter)("users", UsersRepository_1.default, rowLevelPolicies);
        return router;
    });
}
exports.getUsersRouter = getUsersRouter;
