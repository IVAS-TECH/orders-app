import required from './error/required';
import minLengthError from './error/minLength';
import maxLengthError from './error/maxLength';
import lowerCaseLetter from './error/lowerCaseLetter';
import upperCaseLetter from './error/upperCaseLetter';
import digit from './error/digit';
import symbols from './error/symbols';
import Text from '../text/language/Text';
import { Validation, minLength, maxLength } from './../store/form/formField/formFieldWithValueValidation/PasswordField';

type ErrorString = (text: Text) => string;

type ErrorKind = Validation;

type ErrorMap = Record<ErrorKind, ErrorString>;

const errorMap: ErrorMap = {
    required,
    minLength: minLengthError(minLength),
    maxLength: maxLengthError(maxLength),
    lowerCaseLetter,
    upperCaseLetter,
    digit,
    symbols
};

function errorMessageForPassword(error: undefined | ErrorKind): undefined | ErrorString {
    return error === undefined ? undefined : errorMap[error];
}

export default errorMessageForPassword;