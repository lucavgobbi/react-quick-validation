export interface IValidationResult {
    hasError: boolean;
    errorMessage?: string;
    validationFailed?: string;
    name: string;
}
export declare function ApplyValidations(this: any, value: any): IValidationResult;
export declare const Validations: {
    required(value: any): "Field is required" | null;
    length(value: any, min: Number, max: Number): string | null;
    isEmail(value: any): "Field must be a valid email" | null;
    isNumber(value: any): "Field must be a number" | null;
    gt(value: any, gt: number): string | null;
    gte(value: any, gte: number): string | null;
    lt(value: any, lt: number): string | null;
    lte(value: any, lte: number): string | null;
    maxDecimals(value: any, max: number): string | null;
};
