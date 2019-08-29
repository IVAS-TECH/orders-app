import Text from './../../text/language/Text';

export default function maxLength(max: number): (text: Text) => string {
    return text => text.form.fieldError.maxLength(max);
};