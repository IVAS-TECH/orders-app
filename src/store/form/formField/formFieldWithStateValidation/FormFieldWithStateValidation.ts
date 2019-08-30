import { Value as FieldValue } from '../../type';
import { FormFieldValueValidation, FormFieldStateValidation } from '../../reducer';

type FormFieldWithStateValidation<
    Value extends FieldValue,
    InitialValue extends FieldValue,
    State,
    ValidationErrors extends string
> = {
    value: Value,
    initialValue: InitialValue,
    validation: {
        [ValidationError in ValidationErrors]
            : FormFieldStateValidation<Value | InitialValue, State>
            | FormFieldValueValidation<Value | InitialValue>
    }
};

export default FormFieldWithStateValidation;