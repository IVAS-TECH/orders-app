import TextInput from '../../../component/formControlWithText/TextInput'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../store/form/reducer';
import { configure } from '../../../component/utils';
import { State } from '../../../store/reducer';
import Text from '../../../text/language/Text';
import { ComponentType } from 'react';
import ConstraintFormField from './ConstraintFormField';
import { PhoneField, Validation } from '../../../store/form/formField/formFieldWithValueValidation/PhoneField';
import errorMessageForPhone from '../../../fieldError/errorMessageForPhone';
import Action from '../../../type/Action';

export default function phoneField<
    Fields extends ConstraintFormField<Fields, FieldKey, PhoneField>,
    FieldKey extends keyof Fields
>(
{ form, fieldKey, extractFormState, extractShowErrorState, showError, dontShowError }: {
    form: Form<Fields>,
    fieldKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>,
    extractShowErrorState: (state: State) => boolean,
    showError: () => Action,
    dontShowError: () => Action
}):  ComponentType<{}> {
    const {
        value: fieldValue,
        error: fieldError,
        setValue
    } = formField(form, fieldKey);

    const Field = configure(TextInput, {
        id: form.id(fieldKey),
        required: true,
        type: 'tel',
        label,
        margin: true,
        autoComplete: 'tel'
    });
    
    return connect(
        (state: State) => {
            const formState = extractFormState(state);
            const validationError = fieldError!(formState) as undefined | Validation;
            const shouldShow = extractShowErrorState(state);
            const error = shouldShow ? errorMessageForPhone(validationError) : undefined
            return {
                value: fieldValue(formState) as string,
                error
            };
        },
        {
            onValueChange: setValue as (value: string) => Action,
            onFocus: dontShowError,
            onBlur: showError
        }
    )(Field);
};

function label(text: Text): string {
    return text.form.field.phone;
}