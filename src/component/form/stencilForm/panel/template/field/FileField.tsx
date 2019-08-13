import requiredTextInputField from  '../../../../connect/formField/requiredTextInputField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredTextInputField({
    form,
    fieldKey: 'file',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.filesArchive
});

export default Field;