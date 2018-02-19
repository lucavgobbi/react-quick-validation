# react-quick-validation [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/lucavgobbi/react-quick-validation/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react-quick-validation.svg?style=flat)](https://www.npmjs.com/package/react-quick-validation)
An easy-to-use input validation for React with no dependencies!
Move from plain html inputs to components with built-in validation with almost no change required.

> This project was build for my personal use and I decided to share it. Feel free to fork and make pull with features and bugfixes.

> The project was using TypeScript, there is no need to download or write 'Definitions' if you plan to use it in a TypeScript project.

## Installation
``` 
npm install react-quick-validation
```
## Usage
``` javascript
import { TextInput, TextArea, IValidationResult } from "react-quick-validation";

...
onChange(value, validationResult) {
    // value: string -> value in the textbox or textarea
    // validationResult: IValidationResult -> contains the validation result for the value
}

render() {
    return (
        <div>
            <TextInput name="my-text-input" value={this.state.variable1} onChange={this.onChange.bind(this)} validations={["required"]}/>
            <TextArea name="my-text-area" value={this.state.variable2} onChange={this.onChange.bind(this)} validations={["required"]}/>
        </div>
    )
}
```

## TextInput
### Properties
#### value
Type: string
Description: Value to display (current value)
#### name
Type: string
Description: field name (name is sent as a parameter on 'onChange' and defined as html name property)
#### onChange
Type: Function
Parameters: value (string), validationResult (IValidationResult)
Description: function binded to onChange event, parameters: 
#### className (optional)
Type: string
Description: css className to be applied 
#### validations (optional)
Type: Array of string
Description: array of validations to be applied
> validations are triggered onChange() and by calling validateCurrent()
> validations are evaluated in order, stops on the first error and display the message
#### formatter (optional)
Type: Function; 
Parameters: value (string)
Description: callback function that modifies value onBlur and apply validations on new value
#### disabled (optional)
Type: boolean; 
Description: disable field (uses html property)
#### placeholder (optional)
Type: string
Description: placeholder (uses html property)

### Methods
>Use React Ref to call those methods
#### validateCurrent()
Parameters: value(string)
Description: triggers the validation for the current value, update the internal state and return an IValidationResult object with the validation result

## TextArea
### Properties
#### value
Type: string
Description: Value to display (current value)
#### name
Type: string
Description: field name (name is sent as a parameter on 'onChange' and defined as html name property)
#### onChange
Type: Function
Parameters: value (string), validationResult (IValidationResult)
Description: function binded to onChange event, parameters: 
#### className (optional)
Type: string
Description: css className to be applied 
#### validations (optional)
Type: Array of string
Description: array of validations to be applied
>validations are triggered onChange() and by calling validateCurrent()
>validatios are evaluated in order, stops on the first error and display the message
#### formatter (optional)
Type: Function; 
Parameters: value (string)
Description: callback function that modifies value onBlur and apply validations on new value
#### disabled (optional)
Type: boolean; 
Description: disable field (uses html property)
#### rows (optional)
Type: number
Description: number of rows (uses html property)

### Methods
>Use React Ref to call those methods
#### validateCurrent()
Parameters: value(string)
Description: triggers the validation for the current value, update the internal state and return an IValidationResult object with the validation result

## IValidationResult
``` javascript
export interface IValidationResult {
    hasError: boolean;
    errorMessage?: string;
    validationFailed?: string;
    name: string; // field name
};
```

## Built-in Validations
### required
Description: the field is required
Message: Field is required
### length
Parameters: min (number), max (number)
Description: the string lenght must be >= than min, <= than max
Message: Field must be more than ${min} characters long or Field must be less than ${max} characters long
Example: length(10,40)
### isEmail
Description: value must be an email
Message: Field must be a valid email
> regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
### isNumber
Description: value must be a number
Message: Field must be a number
### gt
Parameters: gt (number)
Description: the value must be > than 'gt'
Message: Field must be greater than ${gt}
Example: gt(7)
### gte
Parameters: gte (number)
Description: the value must be >= than 'gte'
Message: Field must be greater or equal than ${gte}
Example: gte(6)
### lt
Parameters: lt (number)
Description: the value must be <> than 'lt'
Message: Field must be less than ${lt}
Example: lt(7)
### lte
Parameters: lte (number)
Description: the value must be <= than 'lte'
Message: Field must be less or equal than ${lte}
Example: lte(6)
### maxDecimals
Parameters: max (number)
Description: number of decimals must be <= than 'number'
Message: Field must have up to ${max} decimals
Example: maxDecimals(2)

## More Examples
> This example uses TypeScript
``` javascript
export interface IMyComponentState {
    value1: string,
    value2: string
}

export class MyComponent extends React.Component<{}, IMyComponentState> {
    references: {
        text1: TextInput;
        text2: TextInput;
        [key: string] : TextInput;
    } = {
        text1: null,
        text2: null
    }
    constructor(props: any) {
        super(props);
        this.state = {
            value1: '',
            value2: ''
        }
    }
    onSubmitClick() {
        const ref = this.references;

        // check for errors before submiting
        const errors = Object.keys(ref).map((key) => {
            return ref[key].validateCurrent().hasError;
        });
        
        if (errors.filter((i: boolean) => i).length === 0) {
            // If no error
        }
    }
    onValueChanged(value: string, result: IValidationResult) {
        this.setState({
            ...this.state,
             { [result.name]: value })
        });
    }
    render() {
        const { value1, value2 } = this.state;

        return (
            <div className="form-group">
                <TextInput ref={(i: any) => { this.references.text1 = i; }} className="form-control" name="value1" value={value1} onChange={this.onValueChanged.bind(this)} validations={["required", "length(0,200)"]} disabled={readOnly} />
                <TextInput ref={(i: any) => { this.references.text2 = i; }} className="form-control" name="value2" value={value2} onChange={this.onValueChanged.bind(this)} validations={["required", "isEmail"]} disabled={readOnly} />
                <button type="button" onClick={this.onSubmitClick.bind(this)}>Save</button>
            </div>
        );
    }
}
```