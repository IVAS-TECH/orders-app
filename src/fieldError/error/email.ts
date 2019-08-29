import Text from './../../text/language/Text';

export default function email(text: Text): string {
    return text.form.fieldError.email;
};