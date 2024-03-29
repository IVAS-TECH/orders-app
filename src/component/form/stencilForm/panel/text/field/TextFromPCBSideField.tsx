import requiredTextInputField from  '../../../../../../connect/form/formField/requiredTextInputField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredTextInputField({
    form,
    fieldKey: 'textFromPCBSide',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.textFromPCBSide,
    disableWhenFieldHasNoValueKey: 'includeTextFromPCBSide'
});

export default Field;