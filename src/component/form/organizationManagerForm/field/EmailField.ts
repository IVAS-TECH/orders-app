import emailField from  '../../../../connect/form/formField/emailField';
import form from '../../../../store/organizationManagerForm/form';
import { selectOrganizationManagerForm, selectShowOrganizationManagerError } from '../../../../store/reducer';
import { showEmailError, dontShowEmailError } from '../../../../store/organizationManagerForm/showError';

const Field = emailField({
    form,
    fieldKey: 'email',
    extractFormState: selectOrganizationManagerForm,
    extractShowErrorState: state => selectShowOrganizationManagerError(state).email,
    showError: showEmailError,
    dontShowError: dontShowEmailError
});

export default Field;