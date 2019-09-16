import FormFieldWithValueValidation from './FormFieldWithValueValidation';
import requireStringValue from './requireStringValue';

export type Validation = 'required' | 'minLength' | 'maxLength';

export type OrganizationNameField = FormFieldWithValueValidation<string, '', Validation>;

export const minLength = 3;

export const maxLength = 99;

export const organizationNameField = {
    initialValue: '' as '',
    validation: {
        required: requireStringValue,
        minLength: (value: string) => (value === '') || (value.length >= minLength),
        maxLength: (value: string) => value.length <= maxLength,
    }
};

export default organizationNameField;
