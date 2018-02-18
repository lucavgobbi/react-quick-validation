/// <reference types="react" />
import * as React from "react";
import { IValidationResult } from "./validations";
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
export declare class TextArea extends React.Component<ITextAreaProps, ITextAreaState> {
    constructor(props: ITextAreaProps);
    validateCurrent(): IValidationResult;
    validate(value: any): IValidationResult;
    onChange(event: any): void;
    onBlur(event: any): void;
    render(): JSX.Element;
}
