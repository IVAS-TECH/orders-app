import {
    SET_FORM_FIELD_VALUE,
    SHOW_ERRORS,
    Value,
    SetFormFieldValueAction,
    ShowErrors
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

export function showErrors(formName: string): ShowErrors {
    return {
        type: SHOW_ERRORS,
        formName
    };
};