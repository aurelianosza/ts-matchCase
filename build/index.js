"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCase = void 0;
exports.matchCase = matchCase;
exports.defaultCase = "defaultCase";
function isCallable(value) {
    return typeof value === "function";
}
function matchCase(value, cases) {
    let entries;
    if (Array.isArray(cases)) {
        entries = cases;
    }
    else {
        entries = Object.entries(cases);
    }
    let defaultExecutor;
    for (let [caseKey, action] of entries) {
        if (caseKey === exports.defaultCase) {
            defaultExecutor = action;
            continue;
        }
        if (isCallable(caseKey)) {
            caseKey = caseKey();
        }
        if (typeof value == "number" && typeof caseKey == "string" && !isNaN(+caseKey)) {
            caseKey = +caseKey;
        }
        if (caseKey === value) {
            return action();
        }
    }
    if (defaultExecutor) {
        return defaultExecutor();
    }
    throw new Error(`No match found for value: "${value}"`);
}
