import requiredTextInputField from  '../../../../connect/formField/requiredTextInputField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredTextInputField({
    form,
    fieldKey: 'textFromPCBSide',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.textFromPCBSide,
    disableWhenFieldHasNoValueKey: 'includeTextFromPCBSide'
});

export default Field;