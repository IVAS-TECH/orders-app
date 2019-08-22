import Form from './../language/Form';

const form: Form = {
    notSelected: _ => 'Not selected',
    fieldError: {
        required: 'Field is required',
        min: min => `Minimal value for the field is ${min}`
    },
    warning: {
        formIsInvalid: 'Form is invalid',
        fieldValueIsInvalid: 'There is field with invalid value'
    }
};

export default form;