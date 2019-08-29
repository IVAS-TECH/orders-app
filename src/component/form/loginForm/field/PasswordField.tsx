import passwordField from  '../../../../connect/form/formField/passwordField';
import form from './../../../../store/loginForm';
import { selectLoginForm } from '../../../../store/reducer';

const Field = passwordField({
    form,
    fieldKey: 'password',
    extractFormState: selectLoginForm
});

export default Field;