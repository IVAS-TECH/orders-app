import ImagePositionSelect from './../../../../../formControl/ImagePositionSelect'; 
import { connect } from 'react-redux';
import form from './../../../../../../store/stencilForm';
import { formField } from './../../../../../../store/form/reducer';
import { configure } from './../../../../../utils';
import { selectStencilForm, selectLanguage, State } from './../../../../../../store/reducer';
import requiredErrorMessage from '../../../../../../connect/form/formField/requiredErrorMessage';

const {
    value,
    error,
    setValue
} = formField(form, 'imagePosition');

const Field = configure(ImagePositionSelect, {
    required: true
});

export default connect(
    (state: State) => {
        const language = selectLanguage(state);
        const formState = selectStencilForm(state);
        return {
            value: value(formState),
            label: language.forms.stencilForm.imagePosition,
            error: requiredErrorMessage(error(formState), language)
        }
    }, { onValueChange: setValue }
)(Field);