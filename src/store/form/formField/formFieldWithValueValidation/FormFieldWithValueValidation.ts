import { Value as FieldValue } from '../../type';
import { FormFieldValueValidation } from './../../reducer';

type FormFieldWithValueValidation<
    Value extends FieldValue,
    InitialValue extends FieldValue,
    ValidationErrors extends string
> = {
    value: Value,
    initialValue: InitialValue,
    validation: {
        [ValidationError in ValidationErrors]: FormFieldValueValidation<Value | InitialValue>
    }
};

export default FormFieldWithValueValidation;