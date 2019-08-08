import field from  './../connect/BooleanField';
import form from './../../../store/stencilForm';
import { selectStencilForm } from './../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'fidushalMarks',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.fidushalMarks,
    placeLableAtStart: true
});

export default Field;