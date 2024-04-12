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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDb = void 0;
const mongoDB = __importStar(require("mongodb"));
class MongoDb {
    constructor(collection) {
        this.collection = collection;
    }
    getWhereAsync(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.collection
                .find(query)
                .toArray();
            return response;
        });
    }
    getByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.collection.findOne({
                _id: new mongoDB.ObjectId(id),
            });
            return response;
        });
    }
    postAsync(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.collection.insertOne(item);
            return response.insertedId.toString();
        });
    }
    updateAsync(id, updatedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldValue = yield this.getByIdAsync(id);
            const response = yield this.collection.updateOne({ _id: new mongoDB.ObjectId(id) }, { $set: Object.assign(Object.assign({}, oldValue), updatedFields) });
            return response.acknowledged;
        });
    }
    deleteAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.collection.deleteOne({
                _id: new mongoDB.ObjectId(id),
            });
            return response.acknowledged;
        });
    }
}
exports.MongoDb = MongoDb;
