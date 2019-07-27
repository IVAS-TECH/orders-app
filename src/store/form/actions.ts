import {
    SET_FORM_FIELD_VALUE,
    VALIDATE_FORM,
    Value,
    SetFormFieldValueAction,
    ValidateForm
} from './types';

export function setFormFieldValue<V = Value>(formName: string, formField: string, value: V): SetFormFieldValueAction<V> {
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