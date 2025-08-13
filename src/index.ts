export type defaultCase = "default";
type CaseKey = string | number | boolean;
type CaseValue<R> = () => R;

export function matchCase<T, R>(
    value: T,
    cases: Record<string|number|"default", CaseValue<R>>|[CaseKey, () => CaseValue<R>][],
): R {
    let entries: [T | defaultCase, CaseValue<R>][];

    if (cases instanceof Map) {
        entries = Array.from(cases.entries());
    } else if (Array.isArray(cases)) {
        entries = cases as [T | defaultCase, CaseValue<R>][];
    } else {
        entries = Object.entries(cases) as [T | defaultCase, CaseValue<R>][];
    }

    let defaultExecutor: CaseValue<R> | undefined;
    
    for (
        const [caseKey, action] of entries as [CaseKey, CaseValue<R>][]
    ) {
        if (caseKey === "default") {
            defaultExecutor = action;
            continue;
        }
        if (caseKey === value) {
            return action();
        }
    }
    if (defaultExecutor) {
        return defaultExecutor();
    }
    throw new Error(`No match found for value: ${value}`);
}
