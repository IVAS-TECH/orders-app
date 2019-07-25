import {Reducer} from 'redux';
import {
    Form,
    FormAction,
    SET_FORM_FIELD_VALUE_WITH_VALIDATION
} from './types';

export interface FormConfig<
    Fields extends {},
    InitialValues extends {[K in keyof Fields]: InitialValues[K]},
    Validation extends Partial<{[K in keyof Fields]: {[V in keyof Validation[K]]: V}}>
> extends Form {
    fields: {
        [K in keyof Fields]: {
            initialValue: InitialValues[K],
            validation: Validation[K] extends {} ? {[V in keyof Validation[K]] : (value: Fields[K] | InitialValues[K]) => boolean} : undefined;
        }
    }
}

export interface FormState<
    Fields extends {},
    InitialValues extends {[K in keyof Fields]: InitialValues[K]},
    Validation extends Partial<{[K in keyof Fields]: {[V in keyof Validation[K]]: V}}>
> {
    fields: {
        [K in keyof Fields]: Validation[K] extends {} ? {
            value: Fields[K] | InitialValues[K],
            error?: keyof Validation[K]
        } : Fields[K] | InitialValues[K]
    }
}

function createInitialState<
    Fields extends {},
    InitialValues extends {[K in keyof Fields]: InitialValues[K]},
    Validation extends Partial<{[K in keyof Fields]: {[V in keyof Validation[K]]: V}}>
>(formConfig: FormConfig<Fields, InitialValues, Validation>): FormState<Fields, InitialValues, Validation> {
    let fields: any = {}
    for(let key in formConfig.fields) {
        const {initialValue} = formConfig.fields[key];
        fields[key] = formConfig.fields[key].validation ? {
            value: initialValue
        } : initialValue;
    }
    return {fields};
}

export default function createReducer<
    Fields extends {},
    InitialValues extends {[K in keyof Fields]: InitialValues[K]},
    Validation extends Partial<{[K in keyof Fields]: {[V in keyof Validation[K]]: V}}>
>(formConfig: FormConfig<Fields, InitialValues, Validation>): Reducer<FormState<Fields, InitialValues, Validation>, FormAction> {
    const initalState = createInitialState(formConfig);
    return (state = initalState, action) => {
        switch(action.type) {
            case SET_FORM_FIELD_VALUE_WITH_VALIDATION:
                const {formName, formField, value} = action;
                if(formName === formConfig.formName) {
                    return {
                        fields: {...state.fields, [formField]: {
                            ...state.fields[formField as keyof Fields],
                            value,
                        }}
                    };
                } else {
                    return state;
                }
            default:
                return state;
        }
    };
}