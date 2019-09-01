import NumberInput from '../../../component/formControlWithText/NumberInput'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../store/form/reducer';
import { configure } from '../../../component/utils';
import { State } from '../../../store/reducer';
import Text from '../../../text/language/Text';
import { ComponentType } from 'react';
import ConstraintFormField from './ConstraintFormField';
import requiredOrMinErrorMessage from './../../../fieldError/requiredOrMinErrorMessage';
import Action from './../../../type/Action';

type FieldConstraint = {
    value: number | '',
    validation: {
        required: (value: number | '') => boolean,
        min: (value: number | '') => boolean
    }
};

export default function numberFieldWithMinValue<
    Fields extends ConstraintFormField<Fields, FieldKey, FieldConstraint>,
    FieldKey extends keyof Fields
>(
{ form, fieldKey, extractFormState, minValue, label }: {
    form: Form<Fields>,
    fieldKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>,
    minValue: number,
    label: (text: Text) => string
}):  ComponentType<{}> {
    const {
        value: fieldValue,
        error: fieldError,
        setValue
    } = formField(form, fieldKey);
    
    const Field = configure(NumberInput, {
        id: form.id(fieldKey),
        integer: true,
        required: true,
        label
    });

    const errorMessage = requiredOrMinErrorMessage(minValue);
    
    return connect(
        (state: State) => {
            const formState = extractFormState(state);
            const error = fieldError!(formState);
            return {
                value: fieldValue(formState) as number | '',
                error: errorMessage(error as undefined | 'required' | 'min')
            };
        },
        { onValueChange: setValue as (value: number | '') => Action }
    )(Field);
};