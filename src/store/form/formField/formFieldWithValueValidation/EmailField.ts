import FormFieldWithValueValidation from './FormFieldWithValueValidation';
import requireStringValue from './requireStringValue';
import isEmail from 'validator/lib/isEmail';

export type EmailField = FormFieldWithValueValidation<string, '', 'required' | 'email'>;

export const emailField = {
    initialValue: '' as '',
    validation: {
        required: requireStringValue,
        email: (value: string) => isEmail(value)
    }
};

export default emailField;
