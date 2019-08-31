import passwordField from  '../../../../connect/form/formField/passwordField';
import form from '../../../../store/registerForm/form';
import { selectRegisterForm, selectShowRegisterError } from '../../../../store/reducer';
import { showPasswordError, dontShowPasswordError } from '../../../../store/registerForm/showError';

const Field = passwordField({
    form,
    fieldKey: 'password',
    extractFormState: selectRegisterForm,
    extractShowErrorState: state => selectShowRegisterError(state).password,
    showError: showPasswordError,
    dontShowError: dontShowPasswordError
});

export default Field;