import userNameField from  '../../../../connect/form/formField/userNameField';
import form from '../../../../store/registerForm/form';
import { selectRegisterForm, selectShowRegisterError } from '../../../../store/reducer';
import { showUserNameError, dontShowUserNameError } from '../../../../store/registerForm/showError';

const Field = userNameField({
    form,
    fieldKey: 'userName',
    extractFormState: selectRegisterForm,
    extractShowErrorState: state => selectShowRegisterError(state).userName,
    showError: showUserNameError,
    dontShowError: dontShowUserNameError
});

export default Field;