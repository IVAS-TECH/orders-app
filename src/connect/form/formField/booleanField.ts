import CheckboxWithLabel, { CheckboxWithLabelProps } from '../../../component/formControl/CheckboxWithLabel'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../store/form/reducer';
import { configure } from '../../../component/utils';
import { State, selectLanguage } from '../../../store/reducer';
import Language from '../../../store/language/Language';
import { ComponentType } from 'react';
import ConstraintFormField from './ConstraintFormField';

export default function booleanField<
    Fields extends ConstraintFormField<Fields, FieldKey, {
        value: boolean,
        validation: never
    }>,
    FieldKey extends keyof Fields
>({ form, fieldKey, extractFormState, label, placeLableAtStart }: {
    form: Form<Fields>,
    fieldKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>,
    label: (language: Language) => string,
    placeLableAtStart?: boolean
}):  ComponentType<{}> {
    const {
        value: fieldValue,
        setValue
    } = formField(form, fieldKey);
    
    const Field = (placeLableAtStart
        ? configure(CheckboxWithLabel, { labelPlacement: 'start' })
        : CheckboxWithLabel
    ) as ComponentType<Pick<CheckboxWithLabelProps, 'checked' | 'label' | 'onToggle'>>;
    
    return connect(
        (state: State) => ({
            checked: fieldValue(extractFormState(state)) as boolean,
            label: label(selectLanguage(state))
        }),
        { onToggle: setValue as (checked: boolean) => { type: string } }
    )(Field);
}