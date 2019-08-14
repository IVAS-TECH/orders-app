import booleanField from  '../../../../../../connect/form/formField/booleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'nanoCoating',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.nanoCoating,
    placeLableAtStart: true
});

export default Field;