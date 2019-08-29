import Text from './../../text/language/Text';

export default function minLength(min: number): (text: Text) => string {
    return text => text.form.fieldError.minLength(min);
};