import required from './error/required';
import passwordsDontMatch from './error/passwordsDontMatch';
import Text from '../text/language/Text';
import { Validation } from './../store/form/formField/formFieldWithStateValidation/ConfirmPasswordField';

type ErrorString = (text: Text) => string;

type ErrorKind = Validation;

type ErrorMap = Record<ErrorKind, ErrorString>;

const errorMap: ErrorMap = {
    required,
    passwordsDontMatch
};

function errorMessageForConfirmPassword(error: undefined | ErrorKind): undefined | ErrorString {
    return error === undefined ? undefined : errorMap[error];
}

export default errorMessageForConfirmPassword;