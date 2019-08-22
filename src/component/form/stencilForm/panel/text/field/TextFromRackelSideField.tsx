import requiredTextInputField from  '../../../../../../connect/form/formField/requiredTextInputField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredTextInputField({
    form,
    fieldKey: 'textFromRackelSide',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.textFromRackelSide,
    disableWhenFieldHasNoValueKey: 'includeTextFromRackelSide'
});

export default Field;