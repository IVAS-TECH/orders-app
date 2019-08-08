import FormFieldWithValueValidation from './FormFieldWithValueValidation';
import { FormFieldValueValidation } from '../../reducer';

export type RequiredStringField = FormFieldWithValueValidation<string, '', 'required'>;

export type RequiredSelectField<Options extends string | number> = FormFieldWithValueValidation<Options, '', 'required'>;

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
    } : noConditionRequiredField;
};

function requireValue(value: string | number | ''): boolean {
    return value !== '';
}

const requiredValidation = {
    required: requireValue
};

const noConditionRequiredField = {
    initialValue: '' as '',
    validation: requiredValidation
};