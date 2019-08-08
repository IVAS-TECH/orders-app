import field from  './../connect/BooleanField';
import form from './../../../store/stencilForm';
import { selectStencilForm } from './../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'includeTextFromPCBSide',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.includeTextFromPCBSide
});

export default Field;