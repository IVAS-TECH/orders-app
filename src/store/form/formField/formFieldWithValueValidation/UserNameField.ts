import FormFieldWithValueValidation from './FormFieldWithValueValidation';
import requireStringValue from './requireStringValue';

export type Validation = 'required' | 'minLength' | 'maxLength';

export type UserNameField = FormFieldWithValueValidation<string, '', Validation>;

export const minLength = 2;

export const maxLength = 23;

export const userNameField = {
    initialValue: '' as '',
    validation: {
        required: requireStringValue,
        minLength: (value: string) => value.length >= minLength,
        maxLength: (value: string) => value.length <= maxLength,
    }
};

export default userNameField;
