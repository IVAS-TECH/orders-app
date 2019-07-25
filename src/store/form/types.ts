export const SET_FORM_FIELD_VALUE = 'ivas-tech/orders-app/form/SET_FORM_FIELD_VALUE';

export const SET_FORM_FIELD_VALUE_WITH_VALIDATION = 'ivas-tech/orders-app/form/SET_FORM_FIELD_VALUE_WITH_VALIDATION';

export const VALIDATE_FORM_FIELD_VALUE = 'ivas-tech/orders-app/form/VALIDATE_FORM_FIELD_VALUE';

export const VALIDATE_FORM_FIELDS_VALUES = 'ivas-tech/orders-app/form/VALIDATE_FORM_FIELDS_VALUES';

export interface Form {
    formName: string
}

export interface FormField extends Form {
    formField: string
};

export interface SetFormFieldValueAction extends FormField {
    type: typeof SET_FORM_FIELD_VALUE,
    value: any
};

export interface SetFormFieldValueWithValidationAction extends FormField {
    type: typeof SET_FORM_FIELD_VALUE_WITH_VALIDATION,
    value: any
};

export interface ValidateFormFieldValue extends FormField {
    type: typeof VALIDATE_FORM_FIELD_VALUE
};

export interface ValidateFormFieldsValues extends Form {
    type: typeof VALIDATE_FORM_FIELDS_VALUES
};

export type FormAction = SetFormFieldValueAction | SetFormFieldValueWithValidationAction | ValidateFormFieldValue | ValidateFormFieldsValues;