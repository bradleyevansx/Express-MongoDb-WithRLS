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
exports.initRouter = void 0;
const express_1 = __importDefault(require("express"));
function initRouter(repository) {
    const router = express_1.default.Router();
    router.use(express_1.default.json());
    router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const games = (yield repository.getWhereAsync(req.body));
            res.status(200).send(games);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    router.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        try {
            const game = (yield repository.getByIdAsync(id));
            if (game) {
                res.status(200).send(game);
            }
        }
        catch (error) {
            res
                .status(404)
                .send(`Unable to find matching document with id: ${req.params.id}`);
        }
    }));
    router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const newUser = req.body;
            const result = yield repository.postAsync(newUser);
            result
                ? res
                    .status(201)
                    .send(`Successfully created a new game with id ${result}`)
                : res.status(500).send("Failed to create a new user.");
        }
        catch (error) {
            console.error(error);
            res.status(400).send(error);
        }
    }));
    router.put("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _b;
        const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
        try {
            const updatedGame = req.body;
            const result = yield repository.updateAsync(id, updatedGame);
            result
                ? res.status(200).send(`Successfully updated user with id ${id}`)
                : res.status(304).send(`User with id: ${id} not updated`);
        }
        catch (error) {
            console.error(error);
            res.status(400).send(error);
        }
    }));
    router.delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _c;
        const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
        try {
            const result = yield repository.deleteAsync(id);
            if (result) {
                res.status(202).send(`Successfully removed user with id ${id}`);
            }
            else if (!result) {
                res.status(400).send(`Failed to remove user with id ${id}`);
            }
        }
        catch (error) {
            console.error(error);
            res.status(400).send(error);
        }
    }));
    return router;
}
exports.initRouter = initRouter;
