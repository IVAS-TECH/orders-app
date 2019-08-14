import form from '../../../../../../store/stencilForm';
import requiredSelectField from  '../../../../../../connect/form/formField/requiredSelectField';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredSelectField({
    form,
    fieldKey: 'position',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.position,
    notSelectedText: language => language.forms.notSelected('it'),
    options: language => ({
        'layout-centered': language.forms.stencilForm.options.layoutCentered,
        'pcb-centered': language.forms.stencilForm.options.pcbCentered
    })
});

export default Field;