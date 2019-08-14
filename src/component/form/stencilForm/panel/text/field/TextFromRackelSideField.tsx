import requiredTextInputField from  '../../../../../../connect/form/formField/requiredTextInputField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredTextInputField({
    form,
    fieldKey: 'textFromRackelSide',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.textFromRackelSide,
    disableWhenFieldHasNoValueKey: 'includeTextFromRackelSide'
});

export default Field;