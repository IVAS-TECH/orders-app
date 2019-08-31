import emailField from  '../../../../connect/form/formField/emailField';
import form from '../../../../store/registerForm/form';
import { selectRegisterForm, selectShowRegisterError } from '../../../../store/reducer';
import { showEmailError, dontShowEmailError } from '../../../../store/registerForm/showError';

const Field = emailField({
    form,
    fieldKey: 'email',
    extractFormState: selectRegisterForm,
    extractShowErrorState: state => selectShowRegisterError(state).email,
    showError: showEmailError,
    dontShowError: dontShowEmailError
});

export default Field;