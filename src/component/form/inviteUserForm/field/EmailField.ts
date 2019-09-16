import emailField from  '../../../../connect/form/formField/emailField';
import form from '../../../../store/inviteToOrganization/inviteUserForm';
import { selectInviteUserForm, selectShowInviteUserError } from '../../../../store/reducer';
import { showEmailError, dontShowEmailError } from '../../../../store/inviteToOrganization/showError';

const Field = emailField({
    form,
    fieldKey: 'email',
    extractFormState: selectInviteUserForm,
    extractShowErrorState: state => selectShowInviteUserError(state).email,
    showError: showEmailError,
    dontShowError: dontShowEmailError
});

export default Field;