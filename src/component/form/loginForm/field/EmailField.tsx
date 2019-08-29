import emailField from  '../../../../connect/form/formField/emailField';
import form from '../../../../store/loginForm/form';
import { selectLoginForm, selectShowLoginError } from '../../../../store/reducer';
import { showEmailError, dontShowEmailError } from '../../../../store/loginForm/showError';

const Field = emailField({
    form,
    fieldKey: 'email',
    extractFormState: selectLoginForm,
    extractShowErrorState: state => selectShowLoginError(state).email,
    showError: showEmailError,
    dontShowError: dontShowEmailError
});

export default Field;