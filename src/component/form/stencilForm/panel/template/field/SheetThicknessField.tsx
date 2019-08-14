import form from '../../../../../../store/stencilForm';
import requiredSelectField from  '../../../../../../connect/form/formField/requiredSelectField';
import { selectStencilForm } from '../../../../../../store/reducer';

const Field = requiredSelectField({
    form,
    fieldKey: 'sheetThickness',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.sheetThickness,
    notSelectedText: language => language.forms.notSelected('she'),
    options: {
        values: [
            30,
            40,
            50,
            80,
            90,
            100,
            110,
            120,
            130,
            150,
            180,
            200,
            250,
            300
        ],
        text: thickness => `${thickness} μm`
    }
});

export default Field;