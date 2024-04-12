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
exports.getAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
function getAuthRouter(authService) {
    return __awaiter(this, void 0, void 0, function* () {
        const router = express_1.default.Router();
        router.use(express_1.default.json());
        router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (req.headers.cookie && (!req.body.username || !req.body.password)) {
                    const newToken = authService.tryLoginAsync("", "", (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=")[1]);
                    if (newToken === null) {
                        res.clearCookie("token");
                        res.status(500).send("Invalid token");
                        return;
                    }
                    else {
                        res.cookie("token", newToken, { httpOnly: true });
                        res.status(200).send("Login successful");
                        return;
                    }
                }
                if (!req.body.username || !req.body.password) {
                    res.status(400).send("Must input valid username and password");
                    return;
                }
                const newToken = yield authService.tryLoginAsync(req.body.username, req.body.password);
                if (newToken === null) {
                    res.status(401).send("Invalid username or password");
                    return;
                }
                else {
                    res.cookie("token", newToken, { httpOnly: true });
                    res.status(200).send("Login successful");
                    return;
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        }));
        router.post("/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield authService.tryRegisterAsync(req.body.username, req.body.password);
                if (result.response === "User created") {
                    res.cookie("token", result.token, { httpOnly: true });
                    res.status(201).send(result.response);
                }
                else {
                    res.status(400).send(result.response);
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        }));
        router.post("/logout", (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("token");
            res.status(200).send("Logged out");
        }));
        return router;
    });
}
exports.getAuthRouter = getAuthRouter;
