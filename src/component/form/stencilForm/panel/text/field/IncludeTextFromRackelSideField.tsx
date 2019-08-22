import booleanField from  '../../../../../../connect/form/formField/booleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'includeTextFromRackelSide',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.includeTextFromRackelSide
});

export default Field;