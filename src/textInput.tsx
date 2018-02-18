import * as React from "react";
import { IValidationResult, ApplyValidations } from "./validations";
import { ErrorSpan } from "./errorSpan";

export interface ITextInputProps {
    className?: string;
    value: any;
    name: string;
    onChange: Function;
    validations?: Array<string>;
    formatter?: Function;
    disabled?: boolean;
    placeholder?: string;
}

export interface ITextInputState {
    validationResult: IValidationResult
}

export class TextInput extends React.Component<ITextInputProps, ITextInputState> {
    constructor(props: ITextInputProps) {
        super(props);

        (this.state as any) = {
            validationResult: {
                hasError: false,
                errorMessage: null,
                validationFailed: null,
                name: this.props.name
            }
        }
        //this.validate(this.props.value);
    }
    validateCurrent(): IValidationResult {
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
        const { value, name, className, disabled, placeholder } = this.props;
        const { validationResult } = this.state;
        return (
            <div>
                <input className={`${className}${(validationResult.hasError ? " field-validation-error" : "")}`} value={value} name={name} onBlur={this.onBlur.bind(this)} onChange={this.onChange.bind(this)} disabled={disabled != null ? disabled : false} placeholder={placeholder}/>
                {validationResult.hasError && validationResult.errorMessage ? <ErrorSpan errorMessage={validationResult.errorMessage}/> : null}
            </div>
        );
    }
}