import booleanField from  '../../../../../../connect/form/formField/booleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'fidushalMarks',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.fidushalMarks,
    placeLableAtStart: true
});

export default Field;