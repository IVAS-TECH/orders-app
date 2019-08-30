import userNameField from  '../../../../connect/form/formField/userNameField';
import form from '../../../../store/organizationManagerForm/form';
import { selectOrganizationManagerForm, selectShowOrganizationManagerError } from '../../../../store/reducer';
import { showUserNameError, dontShowUserNameError } from '../../../../store/organizationManagerForm/showError';

const Field = userNameField({
    form,
    fieldKey: 'userName',
    extractFormState: selectOrganizationManagerForm,
    extractShowErrorState: state => selectShowOrganizationManagerError(state).userName,
    showError: showUserNameError,
    dontShowError: dontShowUserNameError
});

export default Field;