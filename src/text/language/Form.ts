export type Subject = 'he' | 'she' | 'it';

interface Form {
    notSelected: (subject: Subject) => string,
    fieldError: {
        required: string,
        min: (min: number) => string,
        email: string,
        minLength: (min: number) => string,
        maxLength: (max: number) => string,
        symbols: string,
        lowerCaseLetter: string,
        upperCaseLetter: string,
        digit: string
    },
    field: {
        email: string,
        password: string,
        rememberMe: string
    },
    warning: {
        formIsInvalid: string,
        fieldValueIsInvalid: string
    }
}

export default Form;