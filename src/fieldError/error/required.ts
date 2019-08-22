import Text from './../../text/language/Text';

export default function required(text: Text): string {
    return text.form.fieldError.required;
};