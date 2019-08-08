import FormFieldWithoutValidation from "./FormFieldWithoutValidation";

export type BooleanField = FormFieldWithoutValidation<boolean, false>;

export function booleanField<Condition extends string | undefined = undefined>(condition?: Condition): {
    initialValue: false,
    condition?: Condition
} {
    return condition ? { 
        initialValue: false,
        condition
    } : noConditionBooleanField;
};

const noConditionBooleanField = {
    initialValue: false as false
};