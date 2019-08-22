import booleanField from  '../../../../../../connect/form/formField/booleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = booleanField({
    form,
    fieldKey: 'includeTextFromPCBSide',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.includeTextFromPCBSide
});

export default Field;