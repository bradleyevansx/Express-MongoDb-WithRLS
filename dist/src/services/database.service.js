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
exports.getCollection = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
let isSetup = false;
let database;
function connectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isSetup)
            return;
        dotenv_1.default.config();
        const client = new mongodb_1.MongoClient(process.env.DB_CONN_STRING);
        try {
            yield client.connect();
            database = client.db(process.env.DB_NAME);
            console.log(`Successfully connected to database: ${database.databaseName}`);
            isSetup = true;
        }
        catch (error) {
            console.error("Error connecting to database:", error);
            throw error;
        }
    });
}
function getCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDatabase();
        const collection = database.collection(collectionName);
        return collection;
    });
}
exports.getCollection = getCollection;
