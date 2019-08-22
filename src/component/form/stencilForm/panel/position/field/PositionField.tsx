import form from '../../../../../../store/stencilForm';
import requiredSelectField from  '../../../../../../connect/form/formField/requiredSelectField';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredSelectField({
    form,
    fieldKey: 'position',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.position,
    notSelectedText: text => text.form.notSelected('it'),
    options: ['layout-centered', 'pcb-centered'],
    optionText: text => text.stencilForm.optionsFor.position
});

export default Field;