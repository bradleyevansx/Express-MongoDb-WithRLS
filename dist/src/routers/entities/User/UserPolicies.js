"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PolicyBuilder_1 = require("../../../security/PolicyBuilder");
const userPolicies = [];
const createIfUsernameIsLessThan10Characters = new PolicyBuilder_1.Policy("Create", {
    username: { $exists: true },
    password: { $exists: true },
});
userPolicies.push(createIfUsernameIsLessThan10Characters);
exports.default = userPolicies;
