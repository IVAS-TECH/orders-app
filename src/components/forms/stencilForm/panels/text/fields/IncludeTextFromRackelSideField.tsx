import field from  '../../../../connect/formField/BooleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'includeTextFromRackelSide',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.includeTextFromRackelSide
});

export default Field;