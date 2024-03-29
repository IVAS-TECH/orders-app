import createForm, { FormState, FormFieldsValues } from '../form/reducer';
import { EmailField, emailField } from '../form/formField/formFieldWithValueValidation/EmailField';
import { PasswordField, passwordField } from '../form/formField/formFieldWithValueValidation/PasswordField';
import { BooleanField, booleanField } from '../form/formField/formFieldWithoutValidation/BooleanField';
import { ROUTE_HOME , ROUTE_SIGN_IN } from '../location/route';

export interface Fields {
    email: EmailField,
    password: PasswordField,
    remember: BooleanField
};

export type State = FormState<Fields>;

export type FormValues = FormFieldsValues<Fields>;

const form = createForm<Fields>({
    formName: 'loginForm',
    fields: {
        email: emailField,
        password: passwordField,
        remember: booleanField()
    }
}, [ ROUTE_HOME, ROUTE_SIGN_IN ]);

export default form;