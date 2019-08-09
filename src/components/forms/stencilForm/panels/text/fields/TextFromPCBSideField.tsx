import field from  '../../../../connect/formField/RequiredTextInputField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'textFromPCBSide',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.textFromPCBSide,
    disableWhenFieldHasNoValueKey: 'includeTextFromPCBSide'
});

export default Field;