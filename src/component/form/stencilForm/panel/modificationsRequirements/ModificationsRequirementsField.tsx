import TextArea from '../../../../formControlWithText/TextArea'; 
import { connect } from 'react-redux';
import form from '../../../../../store/stencilForm';
import { formField } from '../../../../../store/form/reducer';
import { configure } from '../../../../utils';
import { State, selectStencilForm } from '../../../../../store/reducer';

const {
    value,
    setValue
} = formField(form, 'modificationsRequirements');

const Field = configure(TextArea, {
    initialRows: 7,
    expectedSymbolsPerRow: 79,
    label: text => text.stencilForm.modificationsRequirements,
    helperText: text => text.stencilForm.modificationsRequirementsHelperText
});

export default connect(
    (state: State) => ({ value: value(selectStencilForm(state)) }),
    { onValueChange: setValue }
)(Field);