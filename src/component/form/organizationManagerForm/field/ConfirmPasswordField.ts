import confirmPasswordField from  '../../../../connect/form/formField/confirmPasswordField';
import form from '../../../../store/organizationManagerForm/form';
import { selectOrganizationManagerForm, selectShowOrganizationManagerError } from '../../../../store/reducer';
import { showConfirmPasswordError, dontShowConfirmPasswordError } from '../../../../store/organizationManagerForm/showError';

const Field = confirmPasswordField({
    form,
    fieldKey: 'confirmPassword',
    extractFormState: selectOrganizationManagerForm,
    extractShowErrorState: state => selectShowOrganizationManagerError(state).confirmPassword,
    showError: showConfirmPasswordError,
    dontShowError: dontShowConfirmPasswordError
});

export default Field;