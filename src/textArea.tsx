import * as React from "react";
import { Validations, IValidationResult, ApplyValidations } from "./validations";
import { ErrorSpan } from "./errorSpan";

export interface ITextAreaProps {
    className?: string;
    rows?: number;
    value: any;
    name: string;
    onChange: Function;
    validations?: Array<string>;
    formatter?: Function;
    disabled?: boolean;
}

export interface ITextAreaState {
    validationResult: IValidationResult;
}

export class TextArea extends React.Component<ITextAreaProps, ITextAreaState> {
    constructor(props: ITextAreaProps) {
        super(props);
        
        (this.state as any) = {
            validationResult: {
                hasError: false,
                errorMessage: null,
                validationFailed: null,
                name: this.props.name
            }
        };
        //this.validate(this.props.value);
    }
    validateCurrent() {
        const value = this.props.value;
        return this.validate(value);
    }
    validate(value: any): IValidationResult {
        const result = ApplyValidations.call(this, value);
        this.setState({ validationResult: result }, this.props.onChange(value, result));
        return result;
    }
    onChange(event: any) {
        this.validate(event.target.value);
    }
    onBlur(event: any) {
        let value = event.target.value;
        const result = ApplyValidations.call(this, value);
        if (typeof this.props.formatter === "function") {
            if (!result.hasError) {
                value = this.props.formatter(value);
                this.validate(value);
            };
        }
    }
    render() {
        const { value, name, className, disabled, rows } = this.props;
        const { validationResult } = this.state;
        return (
            <div>
                <textarea className={`${className}${(validationResult.hasError ? " field-validation-error" : "")}`} rows={rows ? rows : 3} value={value} name={name} onBlur={this.onBlur.bind(this)} onChange={this.onChange.bind(this)} disabled={disabled != null ? disabled : false}></textarea>
                {validationResult.hasError && validationResult.errorMessage ? <ErrorSpan errorMessage={validationResult.errorMessage} /> : null}
            </div>
        );
    }
}