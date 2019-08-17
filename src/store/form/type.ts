export const SET_FORM_FIELD_VALUE = 'ivas-tech/orders-app/form/SET_FORM_FIELD_VALUE';

export const SHOW_ERRORS = 'ivas-tech/orders-app/form/SHOW_ERRORS';

export interface Form {
    formName: string
}
export type Value = string | number | boolean | File | null;

export interface SetFormFieldValueAction<Field = string, V = Value> extends Form {
    type: typeof SET_FORM_FIELD_VALUE,
    formField: Field,
    value: V
};

export interface ShowErrors extends Form {
    type: typeof SHOW_ERRORS
};

export type FormAction = SetFormFieldValueAction | ShowErrors;