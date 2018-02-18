import * as React from "react";

export interface IErrorSpanProps {
    errorMessage: string
}

export class ErrorSpan extends React.Component<IErrorSpanProps,{}> {
    render() {
        return <span className="text-danger field-validation-error"><span>{this.props.errorMessage}</span></span>;
    }
}
