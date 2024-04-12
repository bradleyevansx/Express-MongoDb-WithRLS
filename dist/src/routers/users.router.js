"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const MongoDb_1 = require("../db/MongoDb");
const usersRepository_1 = require("../repositories/usersRepository");
const database_service_1 = require("../services/database.service");
const BaseRouter_1 = require("./BaseRouter");
const mongoUserDb = new MongoDb_1.MongoDb(database_service_1.connectionHost.getCollection("users"));
exports.usersRouter = (0, BaseRouter_1.initRouter)(new usersRepository_1.UsersRepository(mongoUserDb));
