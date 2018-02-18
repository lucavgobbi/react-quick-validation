"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var validations_1 = require("./validations");
var errorSpan_1 = require("./errorSpan");
var TextArea = /** @class */ (function (_super) {
    __extends(TextArea, _super);
    function TextArea(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            validationResult: {
                hasError: false,
                errorMessage: null,
                validationFailed: null,
                name: _this.props.name
            }
        };
        return _this;
        //this.validate(this.props.value);
    }
    TextArea.prototype.validateCurrent = function () {
        var value = this.props.value;
        return this.validate(value);
    };
    TextArea.prototype.validate = function (value) {
        var result = validations_1.ApplyValidations.call(this, value);
        this.setState({ validationResult: result }, this.props.onChange(value, result));
        return result;
    };
    TextArea.prototype.onChange = function (event) {
        this.validate(event.target.value);
    };
    TextArea.prototype.onBlur = function (event) {
        var value = event.target.value;
        var result = validations_1.ApplyValidations.call(this, value);
        if (typeof this.props.formatter === "function") {
            if (!result.hasError) {
                value = this.props.formatter(value);
                this.validate(value);
            }
            ;
        }
    };
    TextArea.prototype.render = function () {
        var _a = this.props, value = _a.value, name = _a.name, className = _a.className, disabled = _a.disabled, rows = _a.rows;
        var validationResult = this.state.validationResult;
        return (React.createElement("div", null,
            React.createElement("textarea", { className: "" + className + (validationResult.hasError ? " field-validation-error" : ""), rows: rows ? rows : 3, value: value, name: name, onBlur: this.onBlur.bind(this), onChange: this.onChange.bind(this), disabled: disabled != null ? disabled : false }),
            validationResult.hasError && validationResult.errorMessage ? React.createElement(errorSpan_1.ErrorSpan, { errorMessage: validationResult.errorMessage }) : null));
    };
    return TextArea;
}(React.Component));
exports.TextArea = TextArea;
