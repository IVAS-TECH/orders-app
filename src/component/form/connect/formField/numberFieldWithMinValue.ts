import NumberInput from '../../../formControl/NumberInput'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../../store/form/reducer';
import { configure } from '../../../utils';
import { State, selectLanguage } from '../../../../store/reducer';
import Language from '../../../../store/language/Language';
import { ComponentType } from 'react';
import ConstraintFormField from './ConstraintFormField';

type FieldConstraint = {
    value: number | '',
    validation: {
        required: (value: number | '') => boolean,
        min: (value: number | '') => boolean
    }
}

export default function numberFieldWithMinValue<
    Fields extends ConstraintFormField<Fields, FieldKey, FieldConstraint>,
    FieldKey extends keyof Fields
>(
{ form, fieldKey, extractFormState, minValue, label }: {
    form: Form<Fields>,
    fieldKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>,
    minValue: number,
    label: (language: Language) => string
}):  ComponentType<{}> {
    const {
        value: fieldValue,
        error: fieldError,
        setValue
    } = formField(form, fieldKey);
    
    const Field = configure(NumberInput, {
        id: form.id(fieldKey),
        integer: true,
        required: true
    });
    
    return connect(
        (state: State) => {
            const formState = extractFormState(state);
            const language = selectLanguage(state);
            const error = fieldError!(formState);
            return {
                value: fieldValue(formState) as number | '',
                error: errorMessage(error as undefined | 'required' | 'min', minValue, language),
                label: label(language)
            };
        },
        { onValueChange: setValue as (value: number | '') => { type: string } }
    )(Field);
};

function errorMessage(error: undefined | 'required' | 'min', minValue: number, language: Language): string | undefined {
    switch(error) {
        case 'required': return language.forms.fieldError.required;
        case 'min': return language.forms.fieldError.min(minValue);
        default: return undefined;
    }
}