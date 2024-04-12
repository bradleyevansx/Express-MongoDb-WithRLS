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
const express_1 = __importDefault(require("express"));
const UserRouter_1 = require("./routers/entities/User/UserRouter");
const AuthRouter_1 = require("./routers/AuthRouter");
const AuthService_1 = require("./auth/AuthService");
const getRepository_1 = require("./repositories/getRepository");
const UsersRepository_1 = __importDefault(require("./repositories/UsersRepository"));
const UserPolicies_1 = __importDefault(require("./routers/entities/User/UserPolicies"));
const Auth_1 = require("./middleware/Auth");
const app = (0, express_1.default)();
const port = 8080;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.use("/auth", yield (0, AuthRouter_1.getAuthRouter)(yield new AuthService_1.AuthService(yield (0, getRepository_1.getRepository)("users", UsersRepository_1.default))));
            app.use(Auth_1.jwtMiddleware);
            app.use("/users", yield (0, UserRouter_1.getUsersRouter)(UserPolicies_1.default));
            app.listen(port, () => {
                console.log(`Server started at http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error("Database connection failed", error);
            process.exit();
        }
    });
}
init();
