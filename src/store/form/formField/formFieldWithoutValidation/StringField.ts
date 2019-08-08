import FormFieldWithoutValidation from "./FormFieldWithoutValidation";

export type StringField = FormFieldWithoutValidation<string, ''>;

export function stringField<Condition extends string | undefined = undefined>(condition?: Condition): {
    initialValue: '',
    condition?: Condition
} {
    return condition ? { 
        initialValue: '',
        condition
    } : noConditionStringField;
};

const noConditionStringField = {
    initialValue: '' as ''
};