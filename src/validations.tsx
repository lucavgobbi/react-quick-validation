export interface IValidationResult {
    hasError: boolean;
    errorMessage?: string;
    validationFailed?: string;
    name: string;
};

export function ApplyValidations(this: any, value: any): IValidationResult {
    const validationResult = this.state.validationResult;
    validationResult.hasError = false;
    validationResult.errorMessage = null;
    validationResult.validationFailed = null;

    const availableValidations = Validations as any;
    const validationsToApply = this.props.validations;

    if (validationsToApply) {
        for (let i = 0; i < validationsToApply.length; i++) {
            const rawValidation = validationsToApply[i].split("(");
            const validation = rawValidation[0];
            const validationParams = rawValidation.length > 1
                ? rawValidation[1].slice(0, -1).split(",") : [];
            if (typeof availableValidations[validation] === "function") {
                validationResult.errorMessage = availableValidations[validation].apply(this, [value, ...validationParams]);

                if (validationResult.errorMessage) {
                    validationResult.hasError = true;
                    validationResult.validationFailed = validation;
                    break;
                }
            }
        }
    }

    return validationResult;
}

export const Validations = {
    required(value: any) {
        if (value === undefined || value === null || value.toString().trim() === "") {
            return "Field is required";
        }
        return null;
    },
    length(value: any, min: Number, max: Number) {
        if (value !== null && value !== undefined) {
            if (value.length < min) {
                return `Field must be more than ${min} characters long`;
            }
            if (value.length > max) {
                return `Field must be less than ${max} characters long`;
            }
        }
        return null;
    },
    isEmail(value: any) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value !== "" && !re.test(value)) {
            return "Field must be a valid email";
        }
        return null;
    },
    isNumber(value: any) {
        if (isNaN(value)) {
            return "Field must be a number";
        }
        return null;
    },
    gt(value: any, gt: number) {
        if (value > gt) {
            return null;
        }
        return `Field must be greater than ${gt}`;
    },
    gte(value: any, gte: number) {
        if (value >= gte) {
            return null;
        }
        return `Field must be greater or equal than ${gte}`;
    },
    lt(value: any, lt: number) {
        if (value < lt) {
            return null;
        }
        return `Field must be less than ${lt}`;
    },
    lte(value: any, lte: number) {
        if (value <= lte) {
            return null;
        }
        return `Field must be less or equal than ${lte}`;
    },
    maxDecimals(value: any, max: number) {
        const match = ("" + value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) { return null; }
        const decimals = Math.max(0,
            // Number of digits right of decimal point.
            (match[1] ? match[1].length : 0)
            // Adjust for scientific notation.
            - (match[2] ? +match[2] : 0));
        if (decimals > max) {
            return `Field must have up to ${max} decimals`;
        }
        return null;
    }
}

