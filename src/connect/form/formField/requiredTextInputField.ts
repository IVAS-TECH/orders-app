import TextInput from '../../../component/formControlWithText/TextInput'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../store/form/reducer';
import { configure } from '../../../component/utils';
import { State } from '../../../store/reducer';
import Text from '../../../text/language/Text';
import { ComponentType } from 'react';
import ConstraintFormField from './ConstraintFormField';
import requiredErrorMessage from './../../../fieldError/requiredErrorMessage';
import Action from './../../../type/Action';

type FieldConstraint = {
    value: string,
    validation: {
        required: (value: string) => boolean
    }
};

export default function requiredTextInputField<
    Fields extends ConstraintFormField<Fields, FieldKey, FieldConstraint>,
    FieldKey extends keyof Fields,
    DisableWhenFieldHasNoValueKey extends keyof Fields
>(
{ form, fieldKey, extractFormState, label, disableWhenFieldHasNoValueKey }: {
    form: Form<Fields>,
    fieldKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>,
    label: (text: Text) => string,
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

    const Field = configure(TextInput, {
        id: form.id(fieldKey),
        required: true,
        label
    });
    
    return connect(
        (state: State) => {
            const formState = extractFormState(state);
            const error = fieldError!(formState);
            return {
                value: fieldValue(formState) as string,
                error: requiredErrorMessage(error as undefined | 'required'),
                disabled: disableWhenFieldHasNoValueKey
                    ? !disableWhenFieldHasNoValue!(formState)
                    : undefined
            };
        },
        { onValueChange: setValue as (value: string) => Action }
    )(Field);
};