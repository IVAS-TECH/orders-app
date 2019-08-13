import booleanField from  '../../../../connect/formField/booleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'electrochemicalPolishing',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.electrochemicalPolishing,
    placeLableAtStart: true
});

export default Field;