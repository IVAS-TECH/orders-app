import form from '../../../../../../store/stencilForm';
import requiredSelectField from  '../../../../../../connect/form/formField/requiredSelectField';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredSelectField({
    form,
    fieldKey: 'fidushalMarksKind',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.fidushalMarksKind,
    notSelectedText: language => language.forms.notSelected('he'),
    options: language => ({
        graved: language.forms.stencilForm.options.graved,
        cut: language.forms.stencilForm.options.cut
    })
});

export default Field;