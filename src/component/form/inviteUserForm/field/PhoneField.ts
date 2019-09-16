import phoneField from  '../../../../connect/form/formField/phoneField';
import form from '../../../../store/inviteToOrganization/inviteUserForm';
import { selectInviteUserForm, selectShowInviteUserError } from '../../../../store/reducer';
import { showPhoneError, dontShowPhoneError } from '../../../../store/inviteToOrganization/showError';

const Field = phoneField({
    form,
    fieldKey: 'phone',
    extractFormState: selectInviteUserForm,
    extractShowErrorState: state => selectShowInviteUserError(state).phone,
    showError: showPhoneError,
    dontShowError: dontShowPhoneError
});

export default Field;