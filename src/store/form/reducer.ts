import {Reducer} from 'redux';
import {
    SET_FORM_FIELD_VALUE,
    VALIDATE_FORM_FIELD_VALUE,
    Form as TypesForm,
    SetFormFieldValueAction,
    ValidateFormFieldValue,
    ValidateFormFieldsValues,
    FormAction,
    Value,
    VALIDATE_FORM_FIELDS_VALUES
} from './types';

import {
    setFormFieldValue,
    validateFormFieldValue,
    validateFormFieldsValues
} from './actions';

export interface FormConfig<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: Fields[K]['value'] | Fields[K]['initialValue']) => boolean
        } : undefined
    }>
> extends TypesForm {
    fields: {
        [K in keyof Fields]: {
            initialValue: Fields[K]['initialValue'],
            validation: Validation[K] 
        }
    }
}

export interface FormState<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: Fields[K]['value'] | Fields[K]['initialValue']) => boolean
        } : undefined
    }>
> {
    value: {
        [K in keyof Fields]: Fields[K]['value'] | Fields[K]['initialValue']
    },
    error: {
        [K in keyof Validation]: keyof Validation[K] | undefined
    }
};

export interface Form<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: FormState<Fields, Validation>['value'][K]) => boolean
        } : undefined
    }>
> {
    reducer: Reducer<FormState<Fields, Validation>, FormAction>,
    selectors: {
        value: {
            [K in keyof Fields]: (state: FormState<Fields, Validation>) => FormState<Fields, Validation>['value'][K]
        },
        error: {
            [K in keyof Validation]: (state: FormState<Fields, Validation>) => keyof Validation[K] | undefined
        },
        isValid: (state: FormState<Fields, Validation>) => boolean
    },
    actions: {
        setValue: {
            [K in keyof Fields]: (value: FormState<Fields, Validation>['value'][K]) => SetFormFieldValueAction
        },
        validate: {
            [K in keyof Validation]: () => ValidateFormFieldValue
        }
        validateAll: () => ValidateFormFieldsValues
    }
}

export type FormField<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: FormState<Fields, Validation>['value'][K]) => boolean
        } : undefined
    }>,
    Field extends keyof Fields
> = Validation[Field] extends {} ? {
    value: FormState<Fields, Validation>['value'][Field],
    error: keyof Validation[Field] | undefined,
    setValue: (value: FormState<Fields, Validation>['value'][Field]) => void,
    validate: () => void
} : {
    value: FormState<Fields, Validation>['value'][Field],
    setValue: (value: FormState<Fields, Validation>['value'][Field]) => void
};

export default function createForm<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: Fields[K]['value'] | Fields[K]['initialValue']) => boolean
        } : undefined
    }>
>(formConfig: FormConfig<Fields, Validation>): Form<Fields, Validation> {
    const {formName, fields} = formConfig;
    let value: Partial<Form<Fields, Validation>['selectors']['value']> = {};
    let error: Partial<Form<Fields, Validation>['selectors']['error']> = {};
    let setValue: Partial<Form<Fields, Validation>['actions']['setValue']> = {};
    let validate: Partial<Form<Fields, Validation>['actions']['validate']> = {};
    for(const field in fields) {
        value[field] = state => state.value[field];
        if(fields[field].validation) {
            error[field] = state => state.error[field];
            validate[field] = () => validateFormFieldValue(formName, field);
        }
        setValue[field] = newValue => setFormFieldValue(formName, field, newValue as Value);
    }
    return {
        reducer: createReducer(formConfig),
        selectors: {
            value,
            error,
            isValid: state => hasNoErrors(state.error)
        },
        actions: {
            setValue,
            validate,
            validateAll: () => validateFormFieldsValues(formName)
        }
    } as Form<Fields, Validation>
};

function createReducer<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: Fields[K]['value'] | Fields[K]['initialValue']) => boolean
        } : undefined
    }>
>(formConfig: FormConfig<Fields, Validation>): Reducer<FormState<Fields, Validation>, FormAction> {
    const initalState = createInitialState(formConfig);
    return (state = initalState, action) => {
        switch(action.type) {
            case SET_FORM_FIELD_VALUE:
                return handleSetFormFieldValue<Fields, Validation>(
                    formConfig.formName,
                    state,
                    action
                );
            case VALIDATE_FORM_FIELD_VALUE:
                return handleValidateFormFieldValue<Fields, Validation>(
                    formConfig,
                    state,
                    action
                );
            case VALIDATE_FORM_FIELDS_VALUES:
                return handleValidateFormFieldsValues<Fields, Validation>(
                    formConfig,
                    state,
                    action
                );
            default:
                return state;
        }
    };
};

function createInitialState<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: Fields[K]['value'] | Fields[K]['initialValue']) => boolean
        } : undefined
    }>
>(formConfig: FormConfig<Fields, Validation>): FormState<Fields, Validation> {
    let value: Partial<FormState<Fields, Validation>['value']> = {};
    for(const field in formConfig.fields) {
        const {initialValue} = formConfig.fields[field];
        value[field] = initialValue;
    }
    return {
        value,
        error: {}
    } as FormState<Fields, Validation>;
}

function handleSetFormFieldValue<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: Fields[K]['value'] | Fields[K]['initialValue']) => boolean
        } : undefined
    }>
>(
    handleFormName: string,
    state: FormState<Fields, Validation>,
    action: SetFormFieldValueAction
): FormState<Fields, Validation> {
    const {value: fieldValue} = state;
    const {formName, formField, value} = action;
    if(formName !== handleFormName) {
        return state;
    } else {
        return {
            ...state,
            value: {
                ...fieldValue,
                [formField as keyof Fields]: value
            }
        };
    }
}

type AccessValidation<Validation, Value> = {
    [K in keyof Validation]: (value: Value) => boolean
}

function handleValidateFormFieldValue<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: Fields[K]['value'] | Fields[K]['initialValue']) => boolean
        } : undefined
    }>
>(
    formConfig: FormConfig<Fields, Validation>,
    state: FormState<Fields, Validation>,
    action: ValidateFormFieldValue
): FormState<Fields, Validation> {
    const {formName} = action;
    const formField = action.formField as keyof Fields;
    const {formName: handleFormName, fields} = formConfig;
    if(formName !== handleFormName) {
        return state;
    } else {
        const {error: stateError} = state;
        const {validation} = fields[formField];
        const value = state.value[formField];
        const fieldError = validateField(
            validation as AccessValidation<typeof validation, typeof value>, 
            value
        );
        return stateError[formField as keyof Validation] === fieldError ? state : {
            ...state,
            error: removeKeysWithUndefinedValues({
                ...stateError,
                [formField as keyof Validation]: fieldError
            })
        };
    }
}

function handleValidateFormFieldsValues<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: Fields[K]['value'] | Fields[K]['initialValue']) => boolean
        } : undefined
    }>
>(
    formConfig: FormConfig<Fields, Validation>,
    state: FormState<Fields, Validation>,
    action: ValidateFormFieldsValues
): FormState<Fields, Validation> {
    const {formName} = action;
    const {formName: handleFormName, fields} = formConfig;
    if(formName !== handleFormName) {
        return state;
    } else {
        let error: Partial<FormState<Fields, Validation>['error']> = {};
        let change: boolean = false;
        for(const formField in fields) {
            const {validation} = fields[formField];
            const value = state.value[formField];
            const {error: stateError} = state;
            if(validation) {
                const fieldError = validateField(
                    validation as AccessValidation<typeof validation, typeof value>, 
                    value
                );
                error[formField] = fieldError;
                if(fieldError !== stateError[formField]) {
                    change = true;
                }
            }
        }
        return change ? {
            ...state,
            error: removeKeysWithUndefinedValues(
                error as FormState<Fields, Validation>['error']
            )
        } : state;
    }
}

function validateField<
    Validation extends {
        [K in keyof Validation]: (value: Value) => boolean
    },
    Value
>(validation: Validation, value: Value): keyof Validation | undefined {
    let fieldError: keyof Validation | undefined = undefined;
    for(const error in validation) {
        if(!validation[error](value)) {
            fieldError = error;
            break;
        }
    }
    return fieldError;
}

function hasNoErrors<
    Fields extends {
        [K in keyof Fields]: {
            value: Fields[K]['value'],
            initialValue: Fields[K]['initialValue']
        }
    },
    Validation extends Partial<{
        [K in keyof Fields]: Validation[K] extends {} ? {
            [V in keyof Validation[K]]: (value: Fields[K]['value'] | Fields[K]['initialValue']) => boolean
        } : undefined
    }>
>(errors: FormState<Fields, Validation>['error']): boolean {
    for(const error in errors) {
        if(errors[error] !== undefined) {
            return false;
        }
    }
    return true;
}

function removeKeysWithUndefinedValues<Obj extends {
    [K in keyof Obj]: Obj[K]
}>(object: Obj): Obj {
    (Object.keys(object) as (keyof Obj)[]).forEach(
        key => object[key] === undefined && delete object[key]
    );
    return object;
} 