import Select, { SelectProps } from '../../../formControl/Select'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../../store/form/reducer';
import { configure } from '../../../utils';
import { State, selectLanguage } from '../../../../store/reducer';
import Language from '../../../../store/language/Language';
import { ComponentType, FunctionComponent } from 'react';
import { createSelector } from 'reselect';
import ConstraintFormField from './ConstraintFormField';

type Union<A, B> = A | B;

type FieldConstraint<Value extends string | number> = {
    value: Value,
    validation: {
        required: (value: Value | '') => boolean
    }
}

export default function field<
    Value extends string | number,
    Fields extends ConstraintFormField<Fields, FieldKey, FieldConstraint<Value>>,
    FieldKey extends keyof Fields
>(
{ form, fieldKey, extractFormState, label, notSelectedText, options }: {
    form: Form<Fields>,
    fieldKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>,
    label: (language: Language) => string,
    notSelectedText: (language: Language) => string,
    options: Union<(language: Language) => {
        [Key in Value]: string
    }, {
        values: Array<Value>,
        text: (value: Value) => string
    }>
}):  ComponentType<{}> {
    const {
        value: fieldValue,
        error: fieldError,
        setValue
    } = formField(form, fieldKey);

    const ValueSelect: React.FC<SelectProps<Value>> = Select;

    if(typeof options !== 'function') {
        const Field = configure(ValueSelect, {
            id: form.id(fieldKey),
            required: true,
            options: options.values.map(value => ({
                value,
                text: options.text(value)
            }))
        });

        return connect(
            (state: State) => {
                const formState = extractFormState(state);
                const language = selectLanguage(state);
                const error = fieldError!(formState);
                return {
                    value: fieldValue(formState) as Value | '',
                    error: errorMessage(error as undefined | 'required', language),
                    label: label(language),
                    notSelectedText: notSelectedText ? notSelectedText(language) : undefined
                };
            },
            { onValueChange: setValue as (value: Value) => { type: string } }
        )(Field as FunctionComponent<Pick<SelectProps<Value>, 'error' | 'label' | 'notSelectedText' | 'onValueChange'>>);
    }
    
    const Field = configure(ValueSelect, {
        id: form.id(fieldKey),
        required: true
    });

    const optionsSelector = createSelector(
        selectLanguage,
        language => (Object.entries(options(language)) as Array<[Value, string]>).map(entry => ({
            value: entry[0],
            text: entry[1]
        }))
    );
    
    return connect(
        (state: State) => {
            const formState = extractFormState(state);
            const language = selectLanguage(state);
            const error = fieldError!(formState);
            return {
                value: fieldValue(formState) as Value | '',
                error: errorMessage(error as undefined | 'required', language),
                label: label(language),
                notSelectedText: notSelectedText ? notSelectedText(language) : undefined,
                options: optionsSelector(state)
            };
        },
        { onValueChange: setValue as (value: Value) => { type: string } }
    )(Field as FunctionComponent<Pick<SelectProps<Value>, 'error' | 'label' | 'notSelectedText' | 'options' | 'onValueChange'>>);
}

function errorMessage(error: undefined | 'required', language: Language): string | undefined {
    return error === 'required'
        ? language.forms.fieldError.required
        : undefined;
}