import field from  '../../../../connect/formField/BooleanField';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'fileIsFromRackelSide',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.isFromRackelSide,
    placeLableAtStart: true
});

export default Field;