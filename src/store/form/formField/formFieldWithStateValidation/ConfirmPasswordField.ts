import FormFieldWithStateValidation from './FormFieldWithStateValidation';
import requireStringValue from '../formFieldWithValueValidation/requireStringValue';

export type FromState = {
    password: {
        value: string
    }
};

export type Validation = 'required' | 'passwordsDontMatch';

export type ConfirmPasswordField = FormFieldWithStateValidation<string, '', FromState, Validation>;

export const confirmPasswordField = {
    initialValue: '' as '',
    validation: {
        required: requireStringValue,
        passwordsDontMatch: (value: string, { password }: FromState) => value === password.value
    },
    validationDependsOn: ['password' as 'password']
};

export default confirmPasswordField;
