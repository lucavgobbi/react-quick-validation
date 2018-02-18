"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function ApplyValidations(value) {
    var validationResult = this.state.validationResult;
    validationResult.hasError = false;
    validationResult.errorMessage = null;
    validationResult.validationFailed = null;
    var availableValidations = exports.Validations;
    var validationsToApply = this.props.validations;
    if (validationsToApply) {
        for (var i = 0; i < validationsToApply.length; i++) {
            var rawValidation = validationsToApply[i].split("(");
            var validation = rawValidation[0];
            var validationParams = rawValidation.length > 1
                ? rawValidation[1].slice(0, -1).split(",") : [];
            if (typeof availableValidations[validation] === "function") {
                validationResult.errorMessage = availableValidations[validation].apply(this, [value].concat(validationParams));
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
exports.ApplyValidations = ApplyValidations;
exports.Validations = {
    required: function (value) {
        if (value === undefined || value === null || value.toString().trim() === "") {
            return "Field is required";
        }
        return null;
    },
    length: function (value, min, max) {
        if (value !== null && value !== undefined) {
            if (value.length < min) {
                return "Field must be more than " + min + " characters long";
            }
            if (value.length > max) {
                return "Field must be less than " + max + " characters long";
            }
        }
        return null;
    },
    isEmail: function (value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value !== "" && !re.test(value)) {
            return "Field must be a valid email";
        }
        return null;
    },
    isNumber: function (value) {
        if (isNaN(value)) {
            return "Field must be a number";
        }
        return null;
    },
    gt: function (value, gt) {
        if (value > gt) {
            return null;
        }
        return "Field must be greater than " + gt;
    },
    gte: function (value, gte) {
        if (value >= gte) {
            return null;
        }
        return "Field must be greater or equal than " + gte;
    },
    lt: function (value, lt) {
        if (value < lt) {
            return null;
        }
        return "Field must be less than " + lt;
    },
    lte: function (value, lte) {
        if (value <= lte) {
            return null;
        }
        return "Field must be less or equal than " + lte;
    },
    maxDecimals: function (value, max) {
        var match = ("" + value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) {
            return null;
        }
        var decimals = Math.max(0, 
        // Number of digits right of decimal point.
        (match[1] ? match[1].length : 0)
            // Adjust for scientific notation.
            - (match[2] ? +match[2] : 0));
        if (decimals > max) {
            return "Field must have up to " + max + " decimals";
        }
        return null;
    }
};
