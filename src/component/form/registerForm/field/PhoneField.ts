import phoneField from  '../../../../connect/form/formField/phoneField';
import form from '../../../../store/registerForm/form';
import { selectRegisterForm, selectShowRegisterError } from '../../../../store/reducer';
import { showPhoneError, dontShowPhoneError } from '../../../../store/registerForm/showError';

const Field = phoneField({
    form,
    fieldKey: 'phone',
    extractFormState: selectRegisterForm,
    extractShowErrorState: state => selectShowRegisterError(state).phone,
    showError: showPhoneError,
    dontShowError: dontShowPhoneError
});

export default Field;