import { Value as FieldValue } from './types';
import { FormFieldValueValidation } from './reducer';

export type FormFieldWithoutValidation<
    Value extends FieldValue,
    InitialValue extends FieldValue
> = {
    value: Value,
    initialValue: InitialValue,
    validation: never
};

export type FormFieldWithValueValidation<
    Value extends FieldValue,
    InitialValue extends FieldValue,
    ValidationErrors extends string
> = {
    value: Value,
    initialValue: InitialValue,
    validation: {
        [ValidationError in ValidationErrors]: FormFieldValueValidation<Value | InitialValue>
    }
};

export type StringField = FormFieldWithoutValidation<string, ''>;

export type RequiredStringField = FormFieldWithValueValidation<string, '', 'required'>;

export type BooleanField = FormFieldWithoutValidation<boolean, false>;

export type RequiredSelectField<Options extends string | number> = FormFieldWithValueValidation<Options, '', 'required'>;

export type NumberFieldWithMinValue<Min extends number> = FormFieldWithValueValidation<number | '', Min, 'required' | 'min'>;

export function stringField<Condition extends string | undefined = undefined>(condition?: Condition): {
    initialValue: '',
    condition?: Condition
} {
    return condition ? { 
        initialValue: '',
        condition
    } : noConditionStringField;
};

export function requiredField<
    Condition extends string | undefined = undefined
>(condition?: Condition): {
    initialValue: '',
    validation: {
        required: FormFieldValueValidation<string | number | ''>
    },
    condition?: Condition
} {
    return condition ? { 
        initialValue: '',
        validation: requiredValidation,
        condition
    } : noConditionRequiredStringField;
};

export function booleanField<Condition extends string | undefined = undefined>(condition?: Condition): {
    initialValue: false,
    condition?: Condition
} {
    return condition ? { 
        initialValue: false,
        condition
    } : noConditionBooleanField;
};

export function numberFieldWithMinValue<
    Min extends number,
    Condition extends string | undefined = undefined
>(min: Min, condition?: Condition): {
    initialValue: Min,
    validation: {
        required: FormFieldValueValidation<number | ''>,
        min: FormFieldValueValidation<number | ''>
    },
    condition?: Condition
} {
    const validation = numberFieldWithMinValueValidation(min);
    return condition ? {
        initialValue: min,
        validation,
        condition
    } : {
        initialValue: min,
        validation
    }
};

function requireValue(value: string | number | ''): boolean {
    return value !== '';
}

function numberFieldWithMinValueValidation(min: number): {
    required: FormFieldValueValidation<number | ''>,
    min: FormFieldValueValidation<number | ''>
} {
    return {
        required: requireValue,
        min: minValueValidation(min)
    };
}

function minValueValidation(min: number): FormFieldValueValidation<number | ''> {
    return value => value === '' ? true : value >= min;
}

const noConditionStringField = {
    initialValue: '' as ''
};

const requiredValidation = {
    required: requireValue
};

const noConditionRequiredStringField = {
    initialValue: '' as '',
    validation: requiredValidation
};

const noConditionBooleanField = {
    initialValue: false as false
};