import required from './error/required';
import phone from './error/phone';
import maxLengthError from './error/maxLength';
import Text from '../text/language/Text';
import { Validation, maxLength } from '../store/form/formField/formFieldWithValueValidation/PhoneField';

type ErrorString = (text: Text) => string;

type ErrorKind = Validation;

type ErrorMap = Record<ErrorKind, ErrorString>;

const errorMap: ErrorMap = {
    required,
    maxLength: maxLengthError(maxLength),
    phone
};

function errorMessageForPhone(error: undefined | ErrorKind): undefined | ErrorString {
    return error === undefined ? undefined : errorMap[error];
}

export default errorMessageForPhone;