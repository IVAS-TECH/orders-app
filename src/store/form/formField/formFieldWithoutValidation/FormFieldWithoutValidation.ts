import { Value as FieldValue } from '../../type';

type FormFieldWithoutValidation<
    Value extends FieldValue,
    InitialValue extends FieldValue
> = {
    value: Value,
    initialValue: InitialValue,
    validation: never
};

export default FormFieldWithoutValidation;