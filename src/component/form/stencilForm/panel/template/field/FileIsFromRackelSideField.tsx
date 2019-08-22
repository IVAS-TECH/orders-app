import booleanField from  '../../../../../../connect/form/formField/booleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'fileIsFromRackelSide',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.isFromRackelSide + '?',
    placeLableAtStart: true
});

export default Field;