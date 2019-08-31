import createForm, { FormState, FormFieldsValues } from '../form/reducer';
import { EmailField, emailField } from '../form/formField/formFieldWithValueValidation/EmailField';
import { PasswordField, passwordField } from '../form/formField/formFieldWithValueValidation/PasswordField';
import { ConfirmPasswordField, confirmPasswordField } from '../form/formField/formFieldWithStateValidation/ConfirmPasswordField';
import { UserNameField, userNameField } from '../form/formField/formFieldWithValueValidation/UserNameField';
import { PhoneField, phoneField } from '../form/formField/formFieldWithValueValidation/PhoneField';

export interface Fields {
    email: EmailField,
    password: PasswordField,
    confirmPassword: ConfirmPasswordField,
    userName: UserNameField,
    phone: PhoneField
};

export type State = FormState<Fields>;

export type FormValues = FormFieldsValues<Fields>;

const form = createForm<Fields>({
    formName: 'signUpForm',
    fields: {
        email: emailField,
        password: passwordField,
        confirmPassword: confirmPasswordField,
        userName: userNameField,
        phone: phoneField
    }
});

export default form;