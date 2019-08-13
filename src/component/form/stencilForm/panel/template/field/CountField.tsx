import numberFieldWithMinValue from  '../../../../connect/formField/numberFieldWithMinValue';
import form, { countMin } from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = numberFieldWithMinValue({
    form,
    fieldKey: 'count',
    extractFormState: selectStencilForm,
    minValue: countMin,
    label: language => language.forms.stencilForm.count
});

export default Field;