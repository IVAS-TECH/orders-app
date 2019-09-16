import form from '../../../../store/inviteToOrganization/inviteUserForm';
import { selectInviteUserForm, selectShowInviteUserError } from '../../../../store/reducer';
import { showUserNameError, dontShowUserNameError } from '../../../../store/inviteToOrganization/showError';
import TextInput from '../../../formControlWithText/TextInput'; 
import { formField } from '../../../../store/form/reducer';
import { connect } from 'react-redux';
import { configure } from '../../../utils';
import { State } from '../../../../store/reducer';
import Text from '../../../../text/language/Text';
import minLengthError from '../../../../fieldError/error/minLength';
import maxLengthError from '../../../../fieldError/error/maxLength';
import { minLength, maxLength } from '../../../../store/form/formField/formFieldWithValueValidation/UserNameField';
import { UserNameValidation } from '../../../../store/inviteToOrganization/inviteUserForm';

type ErrorString = (text: Text) => string;

type ErrorMap = Record<UserNameValidation, ErrorString>;

const errorMap: ErrorMap = {
    maxLength: maxLengthError(maxLength),
    minLength: minLengthError(minLength)
};

function errorMessageForUserName(error: undefined | UserNameValidation): undefined | ErrorString {
    return error === undefined ? undefined : errorMap[error];
}

const fieldKey = 'userName';

const {
    value: fieldValue,
    error: fieldError,
    setValue
} = formField(form, fieldKey);

const label = (text: Text) => text.form.field.userName;

const Field = configure(TextInput, {
    id: form.id(fieldKey),
    label,
    autoComplete: 'username',
    margin: true
});

const UserNameField = connect(
    (state: State) => {
        const formState = selectInviteUserForm(state);
        const validationError = fieldError!(formState) as undefined | UserNameValidation;
        const shouldShow = selectShowInviteUserError(state);
        const error = shouldShow ? errorMessageForUserName(validationError) : undefined
        return {
            value: fieldValue(formState) as string,
            error
        };
    },
    {
        onValueChange: setValue,
        onFocus: dontShowUserNameError,
        onBlur: showUserNameError
    }
)(Field);

export default UserNameField;