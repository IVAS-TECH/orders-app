import required from './error/required';
import Text from '../text/language/Text';

function requiredErrorMessage(error: undefined | 'required'): undefined | ((text: Text) => string) {
    return error === 'required' ? required : undefined;
}

export default requiredErrorMessage;