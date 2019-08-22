import Text from './../../text/language/Text';

export default function minFor(min: number): (text: Text) => string {
    return text => text.form.fieldError.min(min);
};