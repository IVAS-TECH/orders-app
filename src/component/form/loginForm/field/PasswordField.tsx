import passwordField from  '../../../../connect/form/formField/passwordField';
import form from '../../../../store/loginForm/form';
import { selectLoginForm, selectShowLoginError } from '../../../../store/reducer';
import { showPasswordError, dontShowPasswordError } from '../../../../store/loginForm/showError';


const Field = passwordField({
    form,
    fieldKey: 'password',
    extractFormState: selectLoginForm,
    extractShowErrorState: state => selectShowLoginError(state).password,
    showError: showPasswordError,
    dontShowError: dontShowPasswordError
});

export default Field;