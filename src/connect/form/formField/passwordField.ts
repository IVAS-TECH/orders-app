import TextInput from '../../../component/formControlWithText/TextInput'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../store/form/reducer';
import { configure } from '../../../component/utils';
import { State } from '../../../store/reducer';
import Text from '../../../text/language/Text';
import { ComponentType } from 'react';
import ConstraintFormField from './ConstraintFormField';
import { PasswordField, Validation } from './../../../store/form/formField/formFieldWithValueValidation/PasswordField';
import errorMessageForPassword from './../../../fieldError/errorMessageForPassword';

export default function passwordField<
    Fields extends ConstraintFormField<Fields, FieldKey, PasswordField>,
    FieldKey extends keyof Fields
>(
{ form, fieldKey, extractFormState }: {
    form: Form<Fields>,
    fieldKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>
}):  ComponentType<{}> {
    const {
        value: fieldValue,
        error: fieldError,
        setValue
    } = formField(form, fieldKey);

    const Field = configure(TextInput, {
        id: form.id(fieldKey),
        required: true,
        label,
        margin: true,
        autoComplete: 'current-password'
    });
    
    return connect(
        (state: State) => {
            const formState = extractFormState(state);
            const error = fieldError!(formState);
            return {
                value: fieldValue(formState) as string,
                error: errorMessageForPassword(error as undefined | Validation),
            };
        },
        { onValueChange: setValue as (value: string) => { type: string } }
    )(Field);
};

function label(text: Text): string {
    return text.form.field.password;
}