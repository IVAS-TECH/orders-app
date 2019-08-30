import TextInput from '../../../component/formControlWithText/TextInput'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../store/form/reducer';
import { configure } from '../../../component/utils';
import { State } from '../../../store/reducer';
import Text from '../../../text/language/Text';
import { ComponentType } from 'react';
import ConstraintFormField from './ConstraintFormField';
import { OrganizationNameField, Validation } from './../../../store/form/formField/formFieldWithValueValidation/OrganizationNameField';
import errorMessageForOrganizationName from './../../../fieldError/errorMessageForOrganizationName';

export default function organizationNameField<
    Fields extends ConstraintFormField<Fields, FieldKey, OrganizationNameField>,
    FieldKey extends keyof Fields
>(
{ form, fieldKey, extractFormState, extractShowErrorState, showError, dontShowError }: {
    form: Form<Fields>,
    fieldKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>,
    extractShowErrorState: (state: State) => boolean,
    showError: () => { type: string },
    dontShowError: () => { type: string }
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
        autoComplete: 'organization'
    });
    
    return connect(
        (state: State) => {
            const formState = extractFormState(state);
            const validationError = fieldError!(formState) as undefined | Validation;
            const shouldShow = extractShowErrorState(state);
            const error = shouldShow ? errorMessageForOrganizationName(validationError) : undefined
            return {
                value: fieldValue(formState) as string,
                error
            };
        },
        {
            onValueChange: setValue as (value: string) => { type: string },
            onFocus: dontShowError,
            onBlur: showError
        }
    )(Field);
};

function label(text: Text): string {
    return text.form.field.organization;
}