export const SET_FORM_FIELD_VALUE = 'ivas-tech/orders-app/form/SET_FORM_FIELD_VALUE';

export const VALIDATE_FORM_FIELD_VALUE = 'ivas-tech/orders-app/form/VALIDATE_FORM_FIELD_VALUE';

export const VALIDATE_FORM_FIELDS_VALUES = 'ivas-tech/orders-app/form/VALIDATE_FORM_FIELDS_VALUES';

export interface Form {
    formName: string
}

export interface FormField extends Form {
    formField: string
};

export type Value = string | number | boolean;

export interface SetFormFieldValueAction extends FormField {
    type: typeof SET_FORM_FIELD_VALUE,
    value: Value
};

export interface ValidateFormFieldValue extends FormField {
    type: typeof VALIDATE_FORM_FIELD_VALUE
};

export interface ValidateFormFieldsValues extends Form {
    type: typeof VALIDATE_FORM_FIELDS_VALUES
};

export type FormAction = SetFormFieldValueAction | ValidateFormFieldValue | ValidateFormFieldsValues;