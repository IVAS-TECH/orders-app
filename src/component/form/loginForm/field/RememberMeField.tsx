import booleanField from  '../../../../connect/form/formField/booleanField';
import form from '../../../../store/loginForm/form';
import { selectLoginForm } from '../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'remember',
    extractFormState: selectLoginForm,
    label: text => text.form.field.rememberMe
});

export default Field;