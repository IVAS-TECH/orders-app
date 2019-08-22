import form from '../../../../../../store/stencilForm';
import requiredSelectField from  '../../../../../../connect/form/formField/requiredSelectField';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredSelectField({
    form,
    fieldKey: 'fidushalMarksKind',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.fidushalMarksKind,
    notSelectedText: text => text.form.notSelected('he'),
    options: ['graved', 'cut'],
    optionText: text => text.stencilForm.optionsFor.fidushalMarksKind
});

export default Field;