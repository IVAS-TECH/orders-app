import field from  './../connect/BooleanField';
import form from './../../../store/stencilForm';
import { selectStencilForm } from './../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'multiply',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.multiply,
    placeLableAtStart: true
});

export default Field;