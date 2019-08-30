import Form from './../language/Form';

const form: Form = {
    notSelected: _ => 'Not selected',
    fieldError: {
        required: 'Field is required',
        min: min => `Minimal value for the field is ${min}`,
        email: 'This is invalid email address',
        minLength: min => `Input length is at least ${min} symbols`,
        maxLength: max => `Input length is at most ${max} symbols`,
        symbols: 'Input excepts only letters, digits and - (dash) and _ (under score)',
        lowerCaseLetter: 'Input must contain at least 1 lower case letter',
        upperCaseLetter: 'Input must contain at least 1 upper case letter',
        digit: 'Input must contain at least 1 digit',
        phone: 'This is invalid phone number',
        passwordsDontMatch: 'Password and Confirm password values do not match'
    },
    field: {
        email: 'Email address',
        password: 'Password',
        rememberMe: 'Remember me',
        confirmPassword: 'Confirm password',
        phone: 'Telephone',
        organization: 'Organization',
        userName: 'User name'
    },
    text: {
        forgotPassword: 'Forgot password ?'
    },
    warning: {
        formIsInvalid: 'Form is invalid',
        fieldValueIsInvalid: 'There is field with invalid value'
    }
};

export default form;