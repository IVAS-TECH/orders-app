import confirmPasswordField from  '../../../../connect/form/formField/confirmPasswordField';
import form from '../../../../store/registerForm/form';
import { selectRegisterForm, selectShowRegisterError } from '../../../../store/reducer';
import { showConfirmPasswordError, dontShowConfirmPasswordError } from '../../../../store/registerForm/showError';

const Field = confirmPasswordField({
    form,
    fieldKey: 'confirmPassword',
    extractFormState: selectRegisterForm,
    extractShowErrorState: state => selectShowRegisterError(state).confirmPassword,
    showError: showConfirmPasswordError,
    dontShowError: dontShowConfirmPasswordError
});

export default Field;