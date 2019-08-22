export type Subject = 'he' | 'she' | 'it';

interface Form {
    notSelected: (subject: Subject) => string,
    fieldError: {
        required: string,
        min: (min: number) => string
    },
    warning: {
        formIsInvalid: string,
        fieldValueIsInvalid: string
    }
}

export default Form;