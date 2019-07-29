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

import { createSelector } from 'reselect';

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
            validation: Fields[Field]['validation'],
            condition?: keyof Fields
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

export type FormFieldsValues<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'] & Value
        }
    }
> = {
    [Field in keyof Fields]?: Fields[Field]['value']
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
        form: {
            isValid: (state: FormState<Fields>) => boolean,
            values: (state: FormState<Fields>) => FormFieldsValues<Fields>
        }
    },
    actions: {
        setValue: {
            [Field in keyof Fields]: (value: FormField<Fields, Field>['value']) => SetFormFieldValueAction<Field, FormField<Fields, Field>['value']>
        },
        validateForm: () => ValidateForm
    }
}

type CondtionMap<
    Fields extends {
        [Field in keyof Fields]: Fields[Field]
    }
> = {
    [Field in keyof Fields]?: Array<keyof Fields>
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
    const isValid: Form<Fields>['selectors']['form']['isValid']
        = createSelector(id, hasNoErrors(formConfig));
    return {
        reducer: createReducer(formConfig),
        selectors: {
            field: selectorsField,
            form: {
                isValid: isValid,
                values: createSelector(
                    id,
                    isValid,
                    extractFormFieldsValues(formConfig)
                )
            }
        },
        actions: {
            setValue,
            validateForm: () => validateForm(formName)
        }
    } as Form<Fields>
};

function id<A>(a: A): A {
    return a;
}

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
    const conditionMap = createConditionMap(formConfig);
    return (state = initalState, action) => {
        switch(action.type) {
            case SET_FORM_FIELD_VALUE:
                return handleSetFormFieldValue(
                    formConfig,
                    conditionMap,
                    state,
                    action
                );
            case VALIDATE_FORM:
                return handleValidateForm(formConfig, state, action);
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

function createConditionMap<
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
>({ fields }: FormConfig<Fields>): CondtionMap<Fields> {
    let conditionMap: CondtionMap<Fields> = {};
    const keys = Object.keys(fields) as Array<keyof Fields>;
    for(const formField of keys) {
        const condition = fields[formField].condition as keyof Fields | undefined;
        if(condition) {
            if(!conditionMap[condition]) {
                conditionMap[condition] = [];
            }
            conditionMap[condition]!.push(formField);
        }
    }
    return conditionMap;
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
    conditionMap: CondtionMap<Fields>,
    state: FormState<Fields>,
    action: SetFormFieldValueAction
): FormState<Fields> {
    const {formName, value} = action;
    const formField = action.formField as keyof Fields;
    const { error } = state[formField];
    if(formName !== formConfig.formName || state[formField].value === value) {
        return state;
    } else {
        return resetDependingConditionalFields(
            formConfig,
            conditionMap,
            {
                ...state,
                [formField]: field(
                    formField,
                    fieldObject(value, error),
                    formConfig.fields[formField].validation
                )
            },
            formField
        );
    }
}

function resetDependingConditionalFields<
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
    conditionMap: CondtionMap<Fields>,
    newState: FormState<Fields>,
    formField: keyof Fields
): FormState<Fields> {
    if(conditionMap[formField] && !newState[formField].value) {
        for(const conditionalFormField of conditionMap[formField]!) {
            const { value, error } = newState[conditionalFormField];
            const { initialValue } = formConfig.fields[conditionalFormField];
            if(value !== initialValue || error) {
                newState[conditionalFormField] = { value: initialValue };
            }
        }
    }
    return newState;
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
            const { validation, condition } = fields[formField];
            if(isActiveFormFieldBasedOnCondition(condition, state)) {
                tempState[formField] = field(
                    formField,
                    state[formField],
                    validation
                )
                if(tempState[formField]!.error !== state[formField].error) {
                    change = true;
                }
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
>({ fields }: FormConfig<Fields>): (state: FormState<Fields>) => boolean {
    return (state) => {
        const keys = Object.keys(state) as Array<keyof Fields>;
        for(const formField of keys) {
            const { validation, condition } = fields[formField];
            if(isActiveFormFieldBasedOnCondition(condition, state)) {
                const { value } = state[formField];
                const error = validation ? validateField(
                    validation as ValidationForField<typeof validation, typeof value>
                    , value
                ) : undefined;
                if(error) {
                    return false;
                }
            }
        }
        return true;
    }
}

function extractFormFieldsValues<
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
>({ fields }: FormConfig<Fields>)
: (
    state: FormState<Fields>,
    isValid: boolean
) => FormFieldsValues<Fields> {
    return (state, isValid) => {
        let values: FormFieldsValues<Fields> = {};
        if(isValid) {
            const keys = Object.keys(fields) as Array<keyof Fields>;
            for(const formField of keys) {
                const { condition } = fields[formField];
                if(isActiveFormFieldBasedOnCondition(condition, state)) {
                    values[formField] = state[formField].value as Fields[typeof formField]['value'];
                }
            }
        }
        return values;
    }
}

function isActiveFormFieldBasedOnCondition<
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
>(condition: keyof Fields | undefined, state: FormState<Fields>): boolean {
    return !condition || (condition && state[condition].value) as boolean;
}