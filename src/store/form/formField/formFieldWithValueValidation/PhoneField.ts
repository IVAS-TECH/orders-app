import FormFieldWithValueValidation from './FormFieldWithValueValidation';
import requireStringValue from './requireStringValue';
import isMobilePhone from 'validator/lib/isMobilePhone';

export type Validation = 'required' | 'maxLength' | 'phone';

export type PhoneField = FormFieldWithValueValidation<string, '', Validation>;

export const maxLength = 19;

export const phoneField = {
    initialValue: '' as '',
    validation: {
        required: requireStringValue,
        maxLength: (value: string) => value.length <= maxLength,
        phone: (value: string) => (value === '') || isMobilePhone(value)
    }
};

export default phoneField;
