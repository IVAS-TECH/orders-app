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

type Union<A, B> = A | B;

export type FormFieldValue<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue']
        }
    },
    Field extends keyof Fields
> = Union<Fields[Field]['value'], Fields[Field]['initialValue']> & Value;

type Constraint<
    Fields extends {
        [Field in keyof Fields]: {
            value: Fields[Field]['value'],
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation']
        }
    }
> = {
    [Field in keyof Fields]: {
        value: Fields[Field]['value'],
        initialValue: Fields[Field]['initialValue'],
        validation: Fields[Field]['validation'] extends {} ? {
            [ValidationError in keyof Fields[Field]['validation']]:
                Union<
                    (value: FormFieldValue<Fields, Field>) => boolean,
                    (value: FormFieldValue<Fields, Field>, state: {
                        [Key in keyof Fields]: {
                            value: FormFieldValue<Fields, Key>,
                            error?: Fields[Key]['validation'] extends {}
                                ? keyof Fields[Key]['validation'] | undefined
                                : undefined
                        }
                    }) => boolean
                >
            } : undefined
    } & {
        value: Value,
        initialValue: Value
    }
};

export type FormFieldValueValidation<V extends Value> = (value: V) => boolean;

export type FormFieldStateValidation<V extends Value, State> = (value: V, state: State) => boolean;

export interface FormConfig<Fields extends Constraint<Fields>> extends TypesForm {
    fields: {
        [Field in keyof Fields]: {
            initialValue: Fields[Field]['initialValue'],
            validation: Fields[Field]['validation'],
            validationDependsOn?: Array< Exclude<keyof Fields, Field>>,
            condition?: Exclude<keyof Fields, Field>
        }
    }
}

export type FormState<Fields extends Constraint<Fields>>= {
    [Field in keyof Fields]: {
        value: FormFieldValue<Fields, Field>,
        error?: Fields[Field]['validation'] extends {}
            ? keyof Fields[Field]['validation'] | undefined
            : undefined
    }
};

export type FormField<
    Fields extends Constraint<Fields>,
    Field extends keyof Fields
> = Fields[Field]['validation'] extends {} ? {
    value: FormFieldValue<Fields, Field>,
    error: keyof Fields[Field]['validation'] | undefined,
    setValue: (value: FormField<Fields, Field>['value']) => void,
    validate: () => void
} : {
    value: FormFieldValue<Fields, Field>,
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

export interface Form<Fields extends Constraint<Fields>> {
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

type ValidationDependsOnMap<
    Fields extends {
        [Field in keyof Fields]: Fields[Field]
    }
> = {
    [Field in keyof Fields]?: Array<keyof Fields>
}

export default function createForm<Fields extends Constraint<Fields>>(formConfig: FormConfig<Fields>): Form<Fields> {
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

function createReducer<Fields extends Constraint<Fields>>(formConfig: FormConfig<Fields>): Reducer<FormState<Fields>, FormAction> {
    const initalState = createInitialState(formConfig);
    const conditionMap = createConditionMap(formConfig);
    const validationDependsOnMap = createValidationDependsOnMap(formConfig);
    return (state = initalState, action) => {
        switch(action.type) {
            case SET_FORM_FIELD_VALUE:
                return handleSetFormFieldValue(
                    formConfig,
                    conditionMap,
                    validationDependsOnMap,
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

function handleSetFormFieldValue<Fields extends Constraint<Fields>>(
    formConfig: FormConfig<Fields>,
    conditionMap: CondtionMap<Fields>,
    validationDependsOnMap: ValidationDependsOnMap<Fields>,
    state: FormState<Fields>,
    action: SetFormFieldValueAction
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

function resetDependingConditionalFields<Fields extends Constraint<Fields>>(
    { fields }: FormConfig<Fields>,
    conditionMap: CondtionMap<Fields>,
    newState: FormState<Fields>,
    formField: keyof Fields
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

function validateDependingOnFields<Fields extends Constraint<Fields>>(
    formConfig: FormConfig<Fields>,
    validationDependsOnMap: ValidationDependsOnMap<Fields>,
    newState: FormState<Fields>,
    formField: keyof Fields
): FormState<Fields> {
    if(validationDependsOnMap[formField]) {
        for(const dependentField of validationDependsOnMap[formField]!) {
            const { condition } = formConfig.fields[dependentField];
            if(isActiveFormFieldBasedOnCondition(condition, newState)) {
                const { value, error } = newState[dependentField];
                const tempFieldObject = formFieldObject(
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

function handleValidateForm<Fields extends Constraint<Fields>>(
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
        return change ? tempState as FormState<Fields> : state;
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

function formFieldObject<Fields extends Constraint<Fields>>(
    { fields }: FormConfig<Fields>,
    state: FormState<Fields>,
    formField: keyof Fields,
    value: FormFieldValue<Fields, typeof formField>
): FormState<Fields>[typeof formField] {
    const { validation } = fields[formField];
    let error: FormField<Fields, typeof formField>['error'] = undefined;
    if(validation) {
        const keys = Object.keys(validation as object) as Array<keyof typeof validation>;
        for(const validationError of keys) {
            const validationFunction = validation[validationError];
            const isValid = validationFunction.length === 1
                ? (validationFunction as FormFieldValueValidation<typeof value>)(value)
                : validationFunction(value, state);
            if(!isValid) {
                error = validationError;
            }
        }
    }
    return error ? { value, error } as FormState<Fields>[typeof formField] : { value };
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