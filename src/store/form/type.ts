export const SET_FORM_FIELD_VALUE = 'ivas-tech/orders-app/form/SET_FORM_FIELD_VALUE';

export const VALIDATE_FORM = 'ivas-tech/orders-app/form/VALIDATE_FORM';

export interface Form {
    formName: string
}
export type Value = string | number | boolean;

export interface SetFormFieldValueAction<Field = string, V = Value> extends Form {
    type: typeof SET_FORM_FIELD_VALUE,
    formField: Field,
    value: V
};

export interface ValidateForm extends Form {
    type: typeof VALIDATE_FORM
};

export type FormAction = SetFormFieldValueAction | ValidateForm;