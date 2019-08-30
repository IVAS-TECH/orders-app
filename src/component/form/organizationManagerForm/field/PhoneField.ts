import phoneField from  '../../../../connect/form/formField/phoneField';
import form from '../../../../store/organizationManagerForm/form';
import { selectOrganizationManagerForm, selectShowOrganizationManagerError } from '../../../../store/reducer';
import { showPhoneError, dontShowPhoneError } from '../../../../store/organizationManagerForm/showError';

const Field = phoneField({
    form,
    fieldKey: 'phone',
    extractFormState: selectOrganizationManagerForm,
    extractShowErrorState: state => selectShowOrganizationManagerError(state).phone,
    showError: showPhoneError,
    dontShowError: dontShowPhoneError
});

export default Field;