import form, { SheetThickness } from '../../../../../../store/stencilForm';
import requiredSelectField from  '../../../../../../connect/form/formField/requiredSelectField';
import { selectStencilForm } from '../../../../../../store/reducer';

const options: Array<SheetThickness> = [30, 40, 50, 80, 90, 100, 110, 120, 130, 150, 180, 200, 250, 300]

const textForOption: (thickness: number) => string = thickness => `${thickness} μm`;

const optionText = options.reduce((current, thickness) => {
    current[thickness] = textForOption(thickness);
    return current;
} , {} as { [Thickness in SheetThickness]: string });

const Field = requiredSelectField({
    form,
    fieldKey: 'sheetThickness',
    extractFormState: selectStencilForm,
    label: text => text.stencilForm.sheetThickness + ' (μm)',
    notSelectedText: text => text.form.notSelected('she'),
    options,
    optionText: _ => optionText
});

export default Field;