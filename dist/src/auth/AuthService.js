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
exports.AuthService = void 0;
const Role_1 = require("../../models/enums/Role");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    tryLoginAsync(username, password, jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (jwt && (!username || !password)) {
                try {
                    const token = this.unsignToken(jwt);
                    const newToken = this.signToken({
                        userId: token.userId,
                        role: token.role,
                    });
                    return newToken;
                }
                catch (error) {
                    return null;
                }
            }
            else if (username && password) {
                const user = yield this.userRepository.getWhereAsync({
                    username: username,
                    password: password,
                });
                if (user.length === 0) {
                    return null;
                }
                const token = this.signToken({
                    userId: user[0]._id.toString(),
                    role: user[0].role,
                });
                return token;
            }
            return null;
        });
    }
    tryRegisterAsync(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !password)
                return { token: "", response: "Must input username and password" };
            const existingUsername = yield this.userRepository.getWhereAsync({
                username: username,
            });
            if (existingUsername.length > 0) {
                return { token: "", response: "Username already exists" };
            }
            const newUser = {
                username: username,
                password: password,
                role: Role_1.Role.User,
            };
            const response = yield this.userRepository.postAsync(newUser);
            const token = this.signToken({
                userId: response,
                role: newUser.role,
            });
            return { token: token, response: "User created" };
        });
    }
    signToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
    }
    unsignToken(token) {
        const response = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return response;
    }
}
exports.AuthService = AuthService;
