import Select, { SelectProps } from '../../../component/formControlWithText/Select'; 
import { connect } from 'react-redux';
import { Form, FormState, formField } from '../../../store/form/reducer';
import { configure } from '../../../component/utils';
import { State } from '../../../store/reducer';
import Text from '../../../text/language/Text';
import { ComponentType, FunctionComponent } from 'react';
import ConstraintFormField from './ConstraintFormField';
import requiredErrorMessage from './../../../fieldError/requiredErrorMessage';

type FieldConstraint<Value extends string | number> = {
    value: Value,
    validation: {
        required: (value: Value | '') => boolean
    }
}

export default function requiredSelectField<
    Value extends string | number,
    Fields extends ConstraintFormField<Fields, FieldKey, FieldConstraint<Value>>,
    FieldKey extends keyof Fields
>(
{ form, fieldKey, extractFormState, label, notSelectedText, options, optionText }: {
    form: Form<Fields>,
    fieldKey: FieldKey,
    extractFormState: (state: State) => FormState<Fields>,
    label: (text: Text) => string,
    notSelectedText: (text: Text) => string,
    options: Array<Value>,
    optionText: (text: Text) => { [V in Value]: string }
}):  ComponentType<{}> {
    const {
        value: fieldValue,
        error: fieldError,
        setValue
    } = formField(form, fieldKey);

    const ValueSelect: React.FC<SelectProps<Value>> = Select;
    
    const Field = configure(ValueSelect, {
        id: form.id(fieldKey),
        required: true,
        label,
        notSelectedText,
        options,
        optionText
    });
    
    return connect(
        (state: State) => {
            const formState = extractFormState(state);
            const error = fieldError!(formState);
            return {
                value: fieldValue(formState) as Value | '',
                error: requiredErrorMessage(error as undefined | 'required')
            };
        },
        { onValueChange: setValue }
    )(Field as FunctionComponent<{ error: undefined | ((text: Text) => string) }>);
};