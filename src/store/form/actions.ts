import {
    SET_FORM_FIELD_VALUE,
    SET_FORM_FIELD_VALUE_WITH_VALIDATION,
    VALIDATE_FORM_FIELD_VALUE,
    VALIDATE_FORM_FIELDS_VALUES,
    SetFormFieldValueAction,
    SetFormFieldValueWithValidationAction,
    ValidateFormFieldValue,
    ValidateFormFieldsValues
} from './types';

export function setFormFieldValue(formName: string, formField: string, value: any): SetFormFieldValueAction {
    return {
        type: SET_FORM_FIELD_VALUE,
        formName,
        formField,
        value
    };
};

export function setFormFieldValueWithValidation(formName: string, formField: string, value: any): SetFormFieldValueWithValidationAction {
    return {
        type: SET_FORM_FIELD_VALUE_WITH_VALIDATION,
        formName,
        formField,
        value
    };
};

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