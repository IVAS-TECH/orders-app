import required from './error/required';
import email from './error/email';
import Text from '../text/language/Text';

type ErrorString = (text: Text) => string;

export type ErrorKind = 'required' | 'email';

type ErrorMap = Record<ErrorKind, ErrorString>;

const errorMap: ErrorMap = {
    required,
    email
};

function errorMessageForEmail(error: undefined | ErrorKind): undefined | ((text: Text) => string) {
    return error === undefined ? undefined : errorMap[error];
}

export default errorMessageForEmail;