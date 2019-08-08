import field from  './../connect/RequiredInputField';
import form from './../../../store/stencilForm';
import { selectStencilForm } from './../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'textFromRackelSide',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.textFromRackelSide,
    disableWhenFieldHasNoValueKey: 'includeTextFromRackelSide'
});

export default Field;