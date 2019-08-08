import field from  './../connect/BooleanField';
import form from './../../../store/stencilForm';
import { selectStencilForm } from './../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'electrochemicalPolishing',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.electrochemicalPolishing,
    placeLableAtStart: true
});

export default Field;