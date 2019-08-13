import booleanField from  '../../../../connect/formField/booleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'fidushalMarks',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.fidushalMarks,
    placeLableAtStart: true
});

export default Field;