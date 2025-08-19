export const defaultCase = "defaultCase"

type CaseKey = string | number | boolean;
type CaseValue<R> = () => R;
type Cases<R> = Record<string|number|"defaultCase", CaseValue<R>>
    | [CaseKey, CaseValue<R>][]
    | [() => CaseKey, CaseValue<R>][];

function isCallable(value: any): value is () => any {
    return typeof value === "function";
}

export function matchCase<T, R>(
    value: T,
    cases: Cases<R>,
): R {
    let entries: [T | "defaultCase", CaseValue<R>][];

    if (Array.isArray(cases)) {
        entries = cases as [T | "defaultCase", CaseValue<R>][];
    } else {
        entries = Object.entries(cases) as [T | "defaultCase", CaseValue<R>][];
    }

    let defaultExecutor: CaseValue<R> | undefined;
    
    for (
        let [caseKey, action] of entries as [CaseKey, CaseValue<R>][]
    ) {
        if (caseKey === defaultCase) {
            defaultExecutor = action;
            continue;
        }

        if (isCallable(caseKey)) {
            caseKey = caseKey() as CaseKey;
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
