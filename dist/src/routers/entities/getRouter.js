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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouter = void 0;
const BaseRouter_1 = require("./BaseRouter");
const getRepository_1 = require("../../repositories/getRepository");
function getRouter(collectionName, repositoryType, rowLevelPolicies) {
    return __awaiter(this, void 0, void 0, function* () {
        const repository = yield (0, getRepository_1.getRepository)(collectionName, repositoryType);
        const router = (0, BaseRouter_1.initRouter)(repository, rowLevelPolicies);
        return { router, repository };
    });
}
exports.getRouter = getRouter;
