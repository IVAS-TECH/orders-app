import { Reducer } from 'redux';

import { createReducer } from '../utils';

import Action from '../../type/Action';

import {
    SET_FORM_FIELD_VALUE,
    SHOW_ERRORS,
    Form as TypesForm,
    Value,
    SetFormFieldValue,
    ShowErrors,
    FormAction
} from './type';

import {
    setFormFieldValue,
    showErrors
} from './action';

import { createSelector } from 'reselect';

type Union<A, B> = A | B;

export type FormFieldValue<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue']
        } & {
            value: Value,
            initialValue: Value
        }
    },
    Field extends keyof Fields
> = Union<Fields[Field]['value'], Fields[Field]['initialValue']> & Value

export type Constraint<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value']
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation']
        }  & {
            value: Value,
            initialValue: Value
        }
    }
> = {
    [Field in keyof Fields]: {
        value: Fields[Field]['value']
        initialValue: Fields[Field]['initialValue'],
        validation: keyof Fields[Field]['validation'] extends string ? {
            [ValidationError in keyof Fields[Field]['validation']]:
                Union<
                    (value: FormFieldValue<Fields, Field>) => boolean,
                    (value: FormFieldValue<Fields, Field>, state: {
                        [Key in keyof Fields]: {
                            value: FormFieldValue<Fields, Key>,
                            error?: Fields[Key]['validation'] extends never
                                ? keyof Fields[Key]['validation'] | undefined
                                : undefined
                        }
                    }) => boolean
                >
            } : never
    } & {
        value: Value,
        initialValue: Value
    }
};

export type FormFieldValueValidation<V extends Value> = (value: V) => boolean;

export type FormFieldStateValidation<V extends Value, State> = (value: V, state: State) => boolean;

export interface FormConfig<Fields extends Constraint<Fields>> extends TypesForm {
    fields: {
        [Field in keyof Fields]: keyof Fields[Field]['validation'] extends string ? {
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'],
            validationDependsOn?: Array< Exclude<keyof Fields, Field>>,
            condition?: Exclude<keyof Fields, Field>
        } : {
            initialValue: Fields[Field]['initialValue'],
            validation?: undefined,
            validationDependsOn?: Array< Exclude<keyof Fields, Field>>,
            condition?: Exclude<keyof Fields, Field>
        }
    }
}

export type FormState<Fields extends Constraint<Fields>>= {
    [Field in keyof Fields]: {
        value: FormFieldValue<Fields, Field>,
        error?: keyof Fields[Field]['validation'] extends string
            ? keyof Fields[Field]['validation'] | undefined
            : undefined
    }
};

export type FormField<
    Fields extends Constraint<Fields>,
    Field extends keyof Fields
> = {
    value: FormFieldValue<Fields, Field>,
    error?: keyof Fields[Field]['validation'] extends string
        ? keyof Fields[Field]['validation'] | undefined
        : undefined,
    setValue: (value: FormField<Fields, Field>['value']) => void
};

export type FormFieldRedux<
    Fields extends Constraint<Fields>,
    Field extends keyof Fields
> = keyof Fields[Field]['validation'] extends string ? {
    value: (state: FormState<Fields>) => FormField<Fields, Field>['value'],
    error: (state: FormState<Fields>) => FormField<Fields, Field>['error'],
    setValue: (value: FormField<Fields, Field>['value']) => SetFormFieldValue<Field, FormField<Fields, Field>['value']>
} : {
    value: (state: FormState<Fields>) => FormField<Fields, Field>['value'],
    error?: undefined,
    setValue: (value: FormField<Fields, Field>['value']) => SetFormFieldValue<Field, FormField<Fields, Field>['value']>
};

export type FormFieldsValues<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value']
        }
    }
> = {
    [Field in keyof Fields]?: Fields[Field]['value']
};

export const SET_FORM_STATE_VALUES = 'ivas-tech/orders-app/form/SET_FORM_STATE_VALUES';

export interface SetFormStateValues<Fields extends Constraint<Fields>> extends TypesForm {
    type: typeof SET_FORM_STATE_VALUES,
    formFieldsValues: FormFieldsValues<Fields>
};

export interface Form<Fields extends Constraint<Fields>> {
    reducer: Reducer<FormState<Fields>, Action>,
    selectors: {
        field: {
            [Field in keyof Fields]: keyof Fields[Field]['validation'] extends string ? {
                value: FormFieldRedux<Fields, Field>['value'],
                error: FormFieldRedux<Fields, Field>['error']
            } : {
                value: FormFieldRedux<Fields, Field>['value'],
                error?: undefined
            }
        },
        form: {
            isValid: (state: FormState<Fields>) => boolean,
            values: (state: FormState<Fields>) => FormFieldsValues<Fields>
        }
    },
    actions: {
        setValue: {
            [Field in keyof Fields]: FormFieldRedux<Fields, Field>['setValue']
        },
        showErrors: () => ShowErrors,
        setValues: (formFieldsValues: FormFieldsValues<Fields>) => SetFormStateValues<Fields>
    },
    id: (field: keyof Fields) => string,
    shouldHandleAction: (action: TypesForm & Action) => boolean
}

type CondtionMap<
    Fields extends {
        [Field in keyof Fields]: Fields[Field]
    }
> = {
    [Field in keyof Fields]?: Array<keyof Fields>
}

type ValidationDependsOnMap<
    Fields extends {
        [Field in keyof Fields]: Fields[Field]
    }
> = {
    [Field in keyof Fields]?: Array<keyof Fields>
}

export default function createForm<Fields extends Constraint<Fields>>(
    formConfig: FormConfig<Fields>,
    resetOnAction?: string[]
): Form<Fields> {
    const { formName, fields } = formConfig;
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
        reducer: createFormReducer(formConfig, resetOnAction),
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
            showErrors: () => showErrors(formName),
            setValues: formFieldsValues => ({
                type: SET_FORM_STATE_VALUES,
                formName,
                formFieldsValues
            })
        },
        id: field => `field:${field}@form:${formName}`,
        shouldHandleAction: action => action.formName === formName
    } as Form<Fields>
};

export function formField<
    Fields extends Constraint<Fields>,
    Field extends keyof Fields
>(form: Form<Fields>, field: Field): FormFieldRedux<Fields, Field> {
    const { value, error } = form.selectors.field[field];
    const setValue = form.actions.setValue[field];
    return (error ? {
        value,
        error,
        setValue
    } : {
        value,
        setValue
    }) as FormFieldRedux<Fields, Field>;
}

function id<A>(a: A): A {
    return a;
}

function createFormReducer<Fields extends Constraint<Fields>>(
    formConfig: FormConfig<Fields>,
    resetOnAction?: string[]
): Reducer<FormState<Fields>, Action> {
    const initalState = createInitialState(formConfig);
    const conditionMap = createConditionMap(formConfig);
    const validationDependsOnMap = createValidationDependsOnMap(formConfig);
    const reducer = createReducer(initalState, {
        [SET_FORM_STATE_VALUES]: (
            state: FormState<Fields>,
            action: SetFormStateValues<Fields>
        ) => handleSetFormStateValues(formConfig, state, action),
        [SET_FORM_FIELD_VALUE]: (
            state: FormState<Fields>,
            action: SetFormFieldValue
        ) => handleSetFormFieldValue(
            formConfig,
            conditionMap,
            validationDependsOnMap,
            state,
            action
        ),
        [SHOW_ERRORS]: (
            state: FormState<Fields>,
            action: ShowErrors
        ) => handleShowErrors(formConfig, state, action)
    });
    return (state: FormState<Fields> = initalState, action: Action) => {
        if(resetOnAction) {
            if(resetOnAction.includes(action.type)) {
                return initalState;
            }
        }
        return reducer(state, action as FormAction);
    };
};

function createInitialState<Fields extends Constraint<Fields>>(
    { fields }: FormConfig<Fields>
): FormState<Fields> {
    let state: Partial<FormState<Fields>> = {};
    const keys = Object.keys(fields) as Array<keyof Fields>;
    for(const field of keys) {
        const { initialValue } = fields[field];
        state[field] = {
            value: initialValue as (typeof initialValue) & Value
        };
    }
    return state as FormState<Fields>;
}

function createConditionMap<Fields extends Constraint<Fields>>(
    { fields }: FormConfig<Fields>
): CondtionMap<Fields> {
    let conditionMap: CondtionMap<Fields> = {};
    const keys = Object.keys(fields) as Array<keyof Fields>;
    for(const formField of keys) {
        const condition = fields[formField].condition;
        if(condition) {
            if(!conditionMap[condition]) {
                conditionMap[condition] = [];
            }
            conditionMap[condition]!.push(formField);
        }
    }
    return conditionMap;
}

function createValidationDependsOnMap<Fields extends Constraint<Fields>>(
    { fields }: FormConfig<Fields>
): ValidationDependsOnMap<Fields> {
    let validationDependsOnMap: ValidationDependsOnMap<Fields> = {};
    const keys = Object.keys(fields) as Array<keyof Fields>;
    for(const formField of keys) {
        const dependsOn = fields[formField].validationDependsOn;
        if(dependsOn) {
            for(const dependingOnField of dependsOn) {
                if(!validationDependsOnMap[dependingOnField]) {
                    validationDependsOnMap[dependingOnField] = [];
                }
                validationDependsOnMap[dependingOnField]!.push(formField);
            }
        }
    }
    return validationDependsOnMap;
}

function handleSetFormStateValues<Fields extends Constraint<Fields>>(
    formConfig: FormConfig<Fields>,
    state: FormState<Fields>,
    action: SetFormStateValues<Fields>
): FormState<Fields> {
    const {formName, formFieldsValues} = action;
    if(formName !== formConfig.formName) {
        return state;
    }
    let newState: Partial<FormState<Fields>> = {};
    const keys = Object.keys(state) as Array<keyof Fields>;
    for(const field of keys) {
        const value = formFieldsValues[field];
        const { initialValue } = formConfig.fields[field];
        newState[field] = {
            value: value !== undefined
                ? value as FormFieldValue<Fields, typeof field>
                : initialValue as (typeof initialValue) & Value
        };
    }
    return newState as FormState<Fields>;
}

function handleSetFormFieldValue<Fields extends Constraint<Fields>>(
    formConfig: FormConfig<Fields>,
    conditionMap: CondtionMap<Fields>,
    validationDependsOnMap: ValidationDependsOnMap<Fields>,
    state: FormState<Fields>,
    action: SetFormFieldValue
): FormState<Fields> {
    const {formName, value} = action;
    const formField = action.formField as keyof Fields;
    if(formName !== formConfig.formName || state[formField].value === value) {
        return state;
    } else {
        return resetDependingConditionalFields(
            formConfig,
            conditionMap,
            validateDependingOnFields(
                formConfig,
                validationDependsOnMap,
                {
                    ...state,
                    [formField]: formFieldObject(formConfig, state, formField, value)
                },
                formField,
            ),
            formField
        );
    }
}

function resetDependingConditionalFields<
    Fields extends Constraint<Fields>,
    Field extends keyof Fields
>(
    { fields }: FormConfig<Fields>,
    conditionMap: CondtionMap<Fields>,
    newState: FormState<Fields>,
    formField: Field
): FormState<Fields> {
    if(conditionMap[formField] && !newState[formField].value) {
        for(const conditionalFormField of conditionMap[formField]!) {
            const { value, error } = newState[conditionalFormField];
            const { initialValue } = fields[conditionalFormField];
            if(value !== initialValue || error) {
                newState[conditionalFormField] = {
                    value: initialValue as (typeof initialValue) & Value
                };
            }
        }
    }
    return newState;
}

function validateDependingOnFields<
    Fields extends Constraint<Fields>,
    Field extends keyof Fields
>(
    formConfig: FormConfig<Fields>,
    validationDependsOnMap: ValidationDependsOnMap<Fields>,
    newState: FormState<Fields>,
    formField: Field
): FormState<Fields> {
    if(validationDependsOnMap[formField]) {
        for(const dependentField of validationDependsOnMap[formField]!) {
            const { condition } = formConfig.fields[dependentField];
            if(isActiveFormFieldBasedOnCondition(condition, newState)) {
                const { value, error } = newState[dependentField];
                const tempFieldObject: FormState<Fields>[Field] = formFieldObject(
                    formConfig,
                    newState,
                    dependentField,
                    value
                );
                if(tempFieldObject.error !== error) {
                    newState[dependentField] = tempFieldObject;
                    validateDependingOnFields(
                        formConfig,
                        validationDependsOnMap,
                        newState,
                        dependentField
                    );
                }
            }
        }
    }
    return newState;
}

function handleShowErrors<Fields extends Constraint<Fields>>(
    formConfig: FormConfig<Fields>,
    state: FormState<Fields>,
    action: ShowErrors
): FormState<Fields> {
    const { formName } = action;
    const {formName: handleFormName, fields} = formConfig;
    if(formName !== handleFormName) {
        return state;
    } else {
        let tempState = {...state};
        let change: boolean = false;
        const keys = Object.keys(fields) as Array<keyof Fields>;
        for(const formField of keys) {
            const { condition } = fields[formField];
            if(isActiveFormFieldBasedOnCondition(condition, state)) {
                tempState[formField] = formFieldObject(
                    formConfig,
                    state,
                    formField,
                    state[formField].value
                )
                if(tempState[formField]!.error !== state[formField].error) {
                    change = true;
                }
            }
        }
        return change ? tempState : state;
    }
}

function hasNoErrors<Fields extends Constraint<Fields>>(
    formConfig: FormConfig<Fields>
): (state: FormState<Fields>) => boolean {
    return state => {
        const keys = Object.keys(state) as Array<keyof Fields>;
        for(const formField of keys) {
            const { condition } = formConfig.fields[formField];
            if(isActiveFormFieldBasedOnCondition(condition, state)) {
                const { error } = formFieldObject(
                    formConfig,
                    state,
                    formField,
                    state[formField].value
                );
                if(error) {
                    return false;
                }
            }
        }
        return true;
    }
}

function formFieldObject<
    Fields extends Constraint<Fields>,
    Field extends keyof Fields
>(
    { fields }: FormConfig<Fields>,
    state: FormState<Fields>,
    formField: Field,
    value: FormFieldValue<Fields, Field>
): FormState<Fields>[Field] {
    const { validation } = fields[formField];
    let error: FormField<Fields, Field>['error'] = undefined;
    if(validation) {
        const keys = Object.keys(validation) as Array<keyof typeof validation>;
        for(const validationError of keys) {
            const validationFunction = validation[validationError];
            const isValid = validationFunction.length === 1
                ? (validationFunction as FormFieldValueValidation<typeof value>)(value)
                : (validationFunction as FormFieldStateValidation<typeof value, typeof state>)(value, state);
            if(!isValid) {
                (error as Union<keyof Fields[Field]['validation'], undefined>) = validationError;
            }
        }
    }
    return error ? { value, error } : { value };
}

function extractFormFieldsValues<Fields extends Constraint<Fields>>(
    { fields }: FormConfig<Fields>
): (
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
                    values[formField] = state[formField].value;
                }
            }
        }
        return values;
    }
}

function isActiveFormFieldBasedOnCondition<Fields extends Constraint<Fields>>(
    condition: keyof Fields | undefined, state: FormState<Fields>
): boolean {
    return !condition || (condition && state[condition].value) as boolean;
}