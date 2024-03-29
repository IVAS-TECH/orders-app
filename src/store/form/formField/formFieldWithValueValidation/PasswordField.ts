import FormFieldWithValueValidation from './FormFieldWithValueValidation';
import requireStringValue from './requireStringValue';

export type Validation
= 'required'
| 'minLength'
| 'maxLength'
| 'lowerCaseLetter'
| 'upperCaseLetter'
| 'digit'
| 'symbols';

export type PasswordField = FormFieldWithValueValidation<string, '', Validation>;

const symbols = /[0-9A-Za-z_-]*/;
const lowerCaseLetter = /[a-z]/;
const upperCaseLetter = /[A-Z]/;
const digit = /[0-9]/;

export const minLength = 8;

export const maxLength = 32;

export const passwordField = {
    initialValue: '' as '',
    validation: {
        required: requireStringValue,
        minLength: (value: string) => (value === '') || (value.length >= minLength),
        maxLength: (value: string) => value.length <= maxLength,
        symbols: (value: string) => (value === '') || symbols.test(value),
        lowerCaseLetter: (value: string) => (value === '') || lowerCaseLetter.test(value),
        upperCaseLetter: (value: string) => (value === '') || upperCaseLetter.test(value),
        digit: (value: string) => (value === '') || digit.test(value)
    }
};

export default passwordField;
