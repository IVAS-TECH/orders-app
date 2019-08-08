import form from './../../../store/stencilForm';
import field from  './../connect/RequiredSelectField';
import { selectStencilForm } from './../../../store/reducer';

const Field = field({
    form,
    fieldKey: 'fidushalMarksSide',
    extractFormState: selectStencilForm,
    label: language => language.forms.stencilForm.fidushalMarksSide,
    notSelectedText: language => language.forms.notSelected('she'),
    options: language => ({
        'pcb': language.forms.stencilForm.options.pcbSide,
        'rackel': language.forms.stencilForm.options.rackelSide,
        'two-sided': language.forms.stencilForm.options.twoSided
    })
});

export default Field;