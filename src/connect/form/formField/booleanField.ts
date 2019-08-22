import CheckboxWithLabel from '../../../component/formControlWithText/CheckboxWithLabel'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../store/form/reducer';
import { configure } from '../../../component/utils';
import { State } from '../../../store/reducer';
import Text from '../../../text/language/Text';
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
    label: (text: Text) => string,
    placeLableAtStart?: boolean
}):  ComponentType<{}> {
    const {
        value: fieldValue,
        setValue
    } = formField(form, fieldKey);
    
    const Field = configure(CheckboxWithLabel, {
        labelPlacement: placeLableAtStart ? 'start' : undefined,
        label
    });
    
    return connect(
        (state: State) => ({ checked: fieldValue(extractFormState(state)) }),
        { onToggle: setValue as (checked: boolean) => { type: string } }
    )(Field);
}