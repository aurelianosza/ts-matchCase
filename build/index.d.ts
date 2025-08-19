export declare const defaultCase = "defaultCase";
type CaseKey = string | number | boolean;
type CaseValue<R> = () => R;
type Cases<R> = Record<string | number | "defaultCase", CaseValue<R>> | [CaseKey, CaseValue<R>][] | [() => CaseKey, CaseValue<R>][];
export declare function matchCase<T, R>(value: T, cases: Cases<R>): R;
export {};
