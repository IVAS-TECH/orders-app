import field from  './../connect/NumberFieldWithMinValue';
import form from './../../../store/stencilForm';
import { selectStencilForm } from './../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'count',
    extractFormState: selectStencilForm,
    minValue: 1,
    label: language => language.forms.stencilForm.count
});

export default Field;