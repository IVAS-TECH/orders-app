import emailField from  '../../../../connect/form/formField/emailField';
import form from './../../../../store/loginForm';
import { selectLoginForm } from '../../../../store/reducer';

const Field = emailField({
    form,
    fieldKey: 'email',
    extractFormState: selectLoginForm
});

export default Field;