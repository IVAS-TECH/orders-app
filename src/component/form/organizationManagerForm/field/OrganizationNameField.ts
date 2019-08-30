import organizationNameField from  '../../../../connect/form/formField/organizationNameField';
import form from '../../../../store/organizationManagerForm/form';
import { selectOrganizationManagerForm, selectShowOrganizationManagerError } from '../../../../store/reducer';
import { showOrganizationError, dontShowOrganizationError } from '../../../../store/organizationManagerForm/showError';

const Field = organizationNameField({
    form,
    fieldKey: 'organization',
    extractFormState: selectOrganizationManagerForm,
    extractShowErrorState: state => selectShowOrganizationManagerError(state).organization,
    showError: showOrganizationError,
    dontShowError: dontShowOrganizationError
});

export default Field;