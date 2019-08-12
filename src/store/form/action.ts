import {
    SET_FORM_FIELD_VALUE,
    VALIDATE_FORM,
    Value,
    SetFormFieldValueAction,
    ValidateForm
} from './type';

export function setFormFieldValue
<Field = string, V = Value>
(formName: string, formField: Field, value: V): SetFormFieldValueAction<Field, V> {
    return {
        type: SET_FORM_FIELD_VALUE,
        formName,
        formField,
        value
    };
};
;

export function validateForm(formName: string): ValidateForm {
    return {
        type: VALIDATE_FORM,
        formName
    };
};