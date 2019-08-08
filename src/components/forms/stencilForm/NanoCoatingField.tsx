import field from  './../connect/BooleanField';
import form from './../../../store/stencilForm';
import { selectStencilForm } from './../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'nanoCoating',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.nanoCoating,
    placeLableAtStart: true
});

export default Field;