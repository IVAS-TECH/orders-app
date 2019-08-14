import Language from '../../../store/language/Language';

export default function errorMessage(
    error: undefined | 'required',
    language: Language
): string | undefined {
    return error === 'required'
        ? language.forms.fieldError.required
        : undefined;
};