import form from '../../../../../../store/stencilForm';
import requiredSelectField from  '../../../../../../connect/form/formField/requiredSelectField';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredSelectField({
    form,
    fieldKey: 'fidushalMarksSide',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.fidushalMarksKind,
    notSelectedText: text => text.form.notSelected('she'),
    options: ['pcb', 'rackel', 'two-sided'],
    optionText: text => text.stencilForm.optionsFor.fidushalMarksSide
});

export default Field;