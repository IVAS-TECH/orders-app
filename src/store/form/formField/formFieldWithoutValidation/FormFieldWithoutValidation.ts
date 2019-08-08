import { Value as FieldValue } from './../../types';

type FormFieldWithoutValidation<
    Value extends FieldValue,
    InitialValue extends FieldValue
> = {
    value: Value,
    initialValue: InitialValue,
    validation: never
};

export default FormFieldWithoutValidation;