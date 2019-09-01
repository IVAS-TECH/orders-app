import createForm, { FormState, FormFieldsValues } from '../form/reducer';
import { EmailField, emailField } from '../form/formField/formFieldWithValueValidation/EmailField';
import { PasswordField, passwordField } from '../form/formField/formFieldWithValueValidation/PasswordField';
import { ConfirmPasswordField, confirmPasswordField } from '../form/formField/formFieldWithStateValidation/ConfirmPasswordField';
import { OrganizationNameField, organizationNameField } from '../form/formField/formFieldWithValueValidation/OrganizationNameField';
import { UserNameField, userNameField } from '../form/formField/formFieldWithValueValidation/UserNameField';
import { PhoneField, phoneField } from '../form/formField/formFieldWithValueValidation/PhoneField';
import { ROUTE_CREATE_ORGANIZATION } from '../location/route';

export interface Fields {
    email: EmailField,
    password: PasswordField,
    confirmPassword: ConfirmPasswordField,
    organization: OrganizationNameField,
    userName: UserNameField,
    phone: PhoneField
};

export type State = FormState<Fields>;

export type FormValues = FormFieldsValues<Fields>;

const form = createForm<Fields>({
    formName: 'organizationManagerForm',
    fields: {
        email: emailField,
        password: passwordField,
        confirmPassword: confirmPasswordField,
        organization: organizationNameField,
        userName: userNameField,
        phone: phoneField
    }
}, [ ROUTE_CREATE_ORGANIZATION ]);

export default form;