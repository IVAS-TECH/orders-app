import required from './error/required';
import minLengthError from './error/minLength';
import maxLengthError from './error/maxLength';
import Text from '../text/language/Text';
import { Validation, minLength, maxLength } from '../store/form/formField/formFieldWithValueValidation/OrganizationNameField';

type ErrorString = (text: Text) => string;

type ErrorKind = Validation;

type ErrorMap = {
    [E in ErrorKind]: ErrorString
};

const errorMap: ErrorMap = {
    required,
    maxLength: maxLengthError(maxLength),
    minLength: minLengthError(minLength)
};

function errorMessageForOrganizationName(error: undefined | ErrorKind): undefined | ErrorString {
    return error === undefined ? undefined : errorMap[error];
}

export default errorMessageForOrganizationName;