import createForm, { FormState, FormFieldsValues } from '../form/reducer';
import { EmailField, emailField } from '../form/formField/formFieldWithValueValidation/EmailField';
import FormFieldWithValueValidation from '../form/formField/formFieldWithValueValidation/FormFieldWithValueValidation';
import { minLength, maxLength } from '../form/formField/formFieldWithValueValidation/UserNameField';
import { PhoneField, phoneField } from '../form/formField/formFieldWithValueValidation/PhoneField';

export type UserNameValidation = 'minLength' | 'maxLength';

type UserNameField = FormFieldWithValueValidation<string, '', UserNameValidation>;

export interface Fields {
    email: EmailField,
    userName: UserNameField,
    phone: PhoneField
};

export type State = FormState<Fields>;

export type FormValues = FormFieldsValues<Fields>;

const userNameField = {
    initialValue: '' as '',
    validation: {
        minLength: (value: string) => (value === '') || (value.length >= minLength),
        maxLength: (value: string) => value.length <= maxLength,
    }
};

const form = createForm<Fields>({
    formName: 'inviteUserForm',
    fields: {
        email: emailField,
        userName: userNameField,
        phone: phoneField
    }
});

export default form;