import TextArea from '../../../../formControl/TextArea'; 
import { connect } from 'react-redux';
import form from '../../../../../store/stencilForm';
import { formField } from '../../../../../store/form/reducer';
import { configure } from '../../../../utils';
import { selectStencilForm, selectLanguage, State } from '../../../../../store/reducer';

const {
    value,
    setValue
} = formField(form, 'modificationsRequirements');

const Field = configure(TextArea, {
    initialRows: 7,
    expectedSymbolsPerRow: 79
});

export default connect(
    (state: State) => {
        const language = selectLanguage(state);
        const { modificationsRequirements, modificationsRequirementsHelperText } = language.forms.stencilForm;
        return {
            value: value(selectStencilForm(state)),
            label: modificationsRequirements,
            helperText: modificationsRequirementsHelperText
        }
    }, { onValueChange: setValue }
)(Field);