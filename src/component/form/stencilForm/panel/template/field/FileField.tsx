import field from  '../../../../connect/formField/RequiredTextInputField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'file',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.filesArchive
});

export default Field;