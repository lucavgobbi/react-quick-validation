/// <reference types="react" />
import * as React from "react";
import { IValidationResult } from "./validations";
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
    validationResult: IValidationResult;
}
export declare class TextInput extends React.Component<ITextInputProps, ITextInputState> {
    constructor(props: ITextInputProps);
    validateCurrent(): IValidationResult;
    validate(value: any): IValidationResult;
    onChange(event: any): void;
    onBlur(event: any): void;
    render(): JSX.Element;
}
