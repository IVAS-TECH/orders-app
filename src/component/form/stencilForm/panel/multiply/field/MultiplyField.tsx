import booleanField from  '../../../../../../connect/form/formField/booleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'multiply',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.multiply,
    placeLableAtStart: true
});

export default Field;