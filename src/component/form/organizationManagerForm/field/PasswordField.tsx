import passwordField from  '../../../../connect/form/formField/passwordField';
import form from '../../../../store/organizationManagerForm/form';
import { selectOrganizationManagerForm, selectShowOrganizationManagerError } from '../../../../store/reducer';
import { showPasswordError, dontShowPasswordError } from '../../../../store/organizationManagerForm/showError';

const Field = passwordField({
    form,
    fieldKey: 'password',
    extractFormState: selectOrganizationManagerForm,
    extractShowErrorState: state => selectShowOrganizationManagerError(state).password,
    showError: showPasswordError,
    dontShowError: dontShowPasswordError
});

export default Field;