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
        digit: string,
        phone: string,
        passwordsDontMatch: string
    },
    field: {
        email: string,
        password: string,
        rememberMe: string,
        confirmPassword: string,
        phone: string,
        organization: string,
        userName: string
    },
    text: {
        forgotPassword: string
    },
    warning: {
        formIsInvalid: string,
        fieldValueIsInvalid: string
    }
}

export default Form;