"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Policy = void 0;
class Policy {
    constructor(action, restriction) {
        this.action = action;
        this.restriction = restriction;
    }
    getAction() {
        return this.action;
    }
    getRestriction() {
        return this.restriction;
    }
}
exports.Policy = Policy;
