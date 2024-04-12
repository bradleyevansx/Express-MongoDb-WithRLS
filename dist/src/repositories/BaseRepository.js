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
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(db) {
        this.db = db;
    }
    getWhereAsync(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getWhereAsync(query);
        });
    }
    getByIdAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getByIdAsync(id);
        });
    }
    postAsync(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.postAsync(item);
        });
    }
    updateAsync(id, updatedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldValue = yield this.getByIdAsync(id);
            return yield this.db.updateAsync(id, Object.assign(Object.assign({}, oldValue), updatedFields));
        });
    }
    deleteAsync(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.deleteAsync(id);
        });
    }
}
exports.BaseRepository = BaseRepository;
