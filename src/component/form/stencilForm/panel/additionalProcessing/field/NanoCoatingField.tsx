import booleanField from  '../../../../../../connect/form/formField/booleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'nanoCoating',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.nanoCoating,
    placeLableAtStart: true
});

export default Field;