import booleanField from  '../../../../../../connect/form/formField/booleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'electrochemicalPolishing',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.electrochemicalPolishing,
    placeLableAtStart: true
});

export default Field;