import {Reducer} from 'redux';
import {
    SET_FORM_FIELD_VALUE,
    VALIDATE_FORM,
    Form as TypesForm,
    Value,
    SetFormFieldValueAction,
    ValidateForm,
    FormAction
} from './types';

import {
    setFormFieldValue,
    validateForm
} from './actions';

export interface FormConfig<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    }
> extends TypesForm {
    fields: {
        [Field in keyof Fields]: {
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] 
        }
    }
}

export type FormState<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    }
> = {
    [Field in keyof Fields]: {
        value: Fields[Field]['value'] | Fields[Field]['initialValue'],
        error?: Fields[Field]['validation'] extends {}
            ? keyof Fields[Field]['validation'] | undefined
            : undefined
    }
};

export type FormField<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    },
    Field extends keyof Fields
> = Fields[Field]['validation'] extends {} ? {
    value: FormState<Fields>[Field]['value'],
    error: keyof Fields[Field]['validation'] | undefined,
    setValue: (value: FormField<Fields, Field>['value']) => void,
    validate: () => void
} : {
    value: FormState<Fields>[Field]['value'],
    error?: undefined,
    setValue: (value: FormField<Fields, Field>['value']) => void
};

export interface Form<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    }
> {
    reducer: Reducer<FormState<Fields>, FormAction>,
    selectors: {
        field: {
            [Field in keyof Fields]: Fields[Field]['validation'] extends {} ? {
                value: (state: FormState<Fields>) => FormField<Fields, Field>['value'],
                error: (state: FormState<Fields>) => FormField<Fields, Field>['error']
            } : {
                value: (state: FormState<Fields>) => FormField<Fields, Field>['value']
            }
        },
        isValid: (state: FormState<Fields>) => boolean
    },
    actions: {
        setValue: {
            [Field in keyof Fields]: (value: FormField<Fields, Field>['value']) => SetFormFieldValueAction<Field, FormField<Fields, Field>['value']>
        },
        validateForm: () => ValidateForm
    }
}

export default function createForm<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    }
>(formConfig: FormConfig<Fields>): Form<Fields> {
    const {formName, fields} = formConfig;
    let selectorsField: Partial<Form<Fields>['selectors']['field']> = {};
    let setValue: Partial<Form<Fields>['actions']['setValue']> = {};
    const keys = Object.keys(fields) as Array<keyof Fields>;
    for(const field of keys) {
        selectorsField[field] = (fields[field].validation
            ? {
                value: state => state[field].value,
                error: state => state[field].error
            } : { value: state => state[field].value }
        ) as Form<Fields>['selectors']['field'][typeof field];
        setValue[field] = newValue => setFormFieldValue(formName, field, newValue);
    }
    return {
        reducer: createReducer(formConfig),
        selectors: {
            field: selectorsField,
            isValid: state => hasNoErrors(state)
        },
        actions: {
            setValue,
            validateForm: () => validateForm(formName)
        }
    } as Form<Fields>
};

function createReducer<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    }
>(formConfig: FormConfig<Fields>): Reducer<FormState<Fields>, FormAction> {
    const initalState = createInitialState(formConfig);
    return (state = initalState, action) => {
        switch(action.type) {
            case SET_FORM_FIELD_VALUE:
                return handleSetFormFieldValue<Fields>(formConfig, state, action);
            case VALIDATE_FORM:
                return handleValidateForm<Fields>(formConfig, state, action);
            default:
                return state;
        }
    };
};

function createInitialState<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    }
>({ fields }: FormConfig<Fields>): FormState<Fields> {
    let state: Partial<FormState<Fields>> = {};
    const keys = Object.keys(fields) as Array<keyof Fields>;
    for(const field of keys) {
        const { initialValue } = fields[field];
        state[field] = { value: initialValue };
    }
    return state as FormState<Fields>;
}

function handleSetFormFieldValue<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    }
>(
    formConfig: FormConfig<Fields>,
    state: FormState<Fields>,
    action: SetFormFieldValueAction
): FormState<Fields> {
    const {formName, value} = action;
    const formField = action.formField as keyof Fields;
    const { error } = state[formField];
    if(formName !== formConfig.formName) {
        return state;
    } else {
        return {
            ...state,
            [formField]: field<Fields>(
                formField,
                fieldObject(value, error),
                formConfig.fields[formField].validation
            )
        };
    }
}

function handleValidateForm<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    }
>(
    formConfig: FormConfig<Fields>,
    state: FormState<Fields>,
    action: ValidateForm
): FormState<Fields> {
    const { formName } = action;
    const {formName: handleFormName, fields} = formConfig;
    if(formName !== handleFormName) {
        return state;
    } else {
        let tempState: Partial<FormState<Fields>> = {};
        let change: boolean = false;
        const keys = Object.keys(fields) as Array<keyof Fields>;
        for(const formField of keys) {
            const {validation} = fields[formField];
            tempState[formField] = field<Fields>(
                formField,
                state[formField],
                validation
            )
            if(tempState[formField]!.error !== state[formField].error) {
                change = true;
            }
        }
        return change ? tempState as FormState<Fields> : state;
    }
}

type ValidationForField<Validation, Value> = {
    [ValidationError in keyof Validation]: (value: Value) => boolean
}

function field<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    }
>(
    formField: keyof Fields,
    field: FormState<Fields>[typeof formField],
    validation: Fields[typeof formField]['validation']
): FormState<Fields>[typeof formField] {
    const { value } = field;
    const error = validation ? validateField(
        validation as ValidationForField<typeof validation, typeof value>
        , value
    ) : undefined;
    return error !== field.error 
        ? fieldObject(value, error) as FormState<Fields>[typeof formField]
        : field;
}

function validateField<
    Validation extends {
        [ValidationError in keyof Validation]: (value: Value) => boolean
    },
    Value
>(validation: Validation, value: Value): keyof Validation | undefined {
    let fieldError: keyof Validation | undefined = undefined;
    const keys = Object.keys(validation) as Array<keyof Validation>;
    for(const validationError of keys) {
        if(!validation[validationError](value)) {
            fieldError = validationError;
            break;
        }
    }
    return fieldError;
}

function fieldObject<
    Value,
    Error
>(value: Value, error: Error): {
    value: Value,
    error?: Error
} {
    return error ? { value, error } : { value };
}

function hasNoErrors<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'] extends {} ? {
                [ValidationError in keyof Fields[Field]['validation']]:
                    (value: Fields[Field]['value'] | Fields[Field]['initialValue']) => boolean
            } : undefined
        } & {
            value: Value,
            initialValue: Value
        }
    }
>(state: FormState<Fields>): boolean {
    const keys = Object.keys(state) as Array<keyof Fields>;
    for(const field of keys) {
        if(state[field].error !== undefined) {
            return false;
        }
    }
    return true;
}