import Input from '../../../formControl/Input'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../../store/form/reducer';
import { configure } from '../../../utils';
import { State, selectLanguage } from '../../../../store/reducer';
import Language from '../../../../store/language/Language';
import { ComponentType } from 'react';
import ConstraintFormField from './ConstraintFormField';

type FieldConstraint = {
    value: string,
    validation: {
        required: (value: string) => boolean
    }
}

export default function field<
    Fields extends ConstraintFormField<Fields, FieldKey, FieldConstraint>,
    FieldKey extends keyof Fields,
    DisableWhenFieldHasNoValueKey extends keyof Fields
>(
{ form, fieldKey, extractFormState, label, disableWhenFieldHasNoValueKey }: {
    form: Form<Fields>,
    fieldKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>,
    label: (language: Language) => string,
    disableWhenFieldHasNoValueKey?: DisableWhenFieldHasNoValueKey
}):  ComponentType<{}> {
    const {
        value: fieldValue,
        error: fieldError,
        setValue
    } = formField(form, fieldKey);
    
    const disableWhenFieldHasNoValue = disableWhenFieldHasNoValueKey
        ? formField(form, disableWhenFieldHasNoValueKey).value
        : undefined;

    const Field = configure(Input, {
        id: form.id(fieldKey),
        required: true
    });
    
    return connect(
        (state: State) => {
            const formState = extractFormState(state);
            const language = selectLanguage(state);
            const error = fieldError!(formState);
            return {
                value: fieldValue(formState) as string,
                error: errorMessage(error as undefined | 'required', language),
                label: label(language),
                disabled: disableWhenFieldHasNoValueKey
                    ? !disableWhenFieldHasNoValue!(formState)
                    : undefined
            };
        },
        { onValueChange: setValue as (value: string) => { type: string } }
    )(Field);
}

function errorMessage(error: undefined | 'required', language: Language): string | undefined {
    return error === 'required'
        ? language.forms.fieldError.required
        : undefined;
}