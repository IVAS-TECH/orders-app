import {
    SET_FORM_FIELD_VALUE,
    VALIDATE_FORM_FIELD_VALUE,
    VALIDATE_FORM_FIELDS_VALUES,
    Value,
    SetFormFieldValueAction,
    ValidateFormFieldValue,
    ValidateFormFieldsValues
} from './types';

export function setFormFieldValue(formName: string, formField: string, value: Value): SetFormFieldValueAction {
    return {
        type: SET_FORM_FIELD_VALUE,
        formName,
        formField,
        value
    };
};
;

export function validateFormFieldValue(formName: string, formField: string): ValidateFormFieldValue {
    return {
        type: VALIDATE_FORM_FIELD_VALUE,
        formName,
        formField
    };
};

export function validateFormFieldsValues(formName: string): ValidateFormFieldsValues {
    return {
        type: VALIDATE_FORM_FIELDS_VALUES,
        formName
    };
};