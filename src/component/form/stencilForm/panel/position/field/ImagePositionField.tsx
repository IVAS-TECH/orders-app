import ImagePositionSelect from './../../../../../formControlWithText/ImagePositionSelect'; 
import { connect } from 'react-redux';
import form from './../../../../../../store/stencilForm';
import { formField } from './../../../../../../store/form/reducer';
import { configure } from './../../../../../utils';
import { State, selectStencilForm  } from './../../../../../../store/reducer';
import requiredErrorMessage from '../../../../../../fieldError/requiredErrorMessage';

const {
    value,
    error,
    setValue
} = formField(form, 'imagePosition');

const Field = configure(ImagePositionSelect, {
    required: true,
    label: text => text.stencilForm.imagePosition
});

export default connect(
    (state: State) => {
        const formState = selectStencilForm(state);
        return {
            value: value(formState),
            error: requiredErrorMessage(error(formState))
        };
    }, { onValueChange: setValue }
)(Field);