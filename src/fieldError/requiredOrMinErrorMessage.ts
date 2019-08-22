import required from './error/required';
import minFor from './error/min';
import Text from '../text/language/Text';

type ErrorString = (text: Text) => string;

type ErrorKind = 'required' | 'min';

type ErrorMap = {
    [E in ErrorKind]: ErrorString
};

const mapError: (min: number) => ErrorMap
= min => ({
    'required': required,
    'min': minFor(min)
});

const handleError: (errorMap: ErrorMap) => (error: ErrorKind | undefined) => ErrorString | undefined
= errorMap => error => error === undefined ? undefined : errorMap[error];

const requiredOrMInErrorMessage: (min: number) => ReturnType<typeof handleError>
= min => handleError(mapError(min));

export default requiredOrMInErrorMessage;