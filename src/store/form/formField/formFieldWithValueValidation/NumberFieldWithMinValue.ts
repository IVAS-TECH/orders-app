import FormFieldWithValueValidation from "./FormFieldWithValueValidation";
import { FormFieldValueValidation } from "./../../reducer";

export type NumberFieldWithMinValue<Min extends number> = FormFieldWithValueValidation<number | '', Min, 'required' | 'min'>;

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


function numberFieldWithMinValueValidation(min: number): {
    required: FormFieldValueValidation<number | ''>,
    min: FormFieldValueValidation<number | ''>
} {
    return {
        required: requireValue,
        min: minValueValidation(min)
    };
}

function requireValue(value: number | ''): boolean {
    return value !== '';
}

function minValueValidation(min: number): FormFieldValueValidation<number | ''> {
    return value => value === '' ? true : value >= min;
}