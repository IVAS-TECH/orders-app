import Input from '../../Input'; 
import { connect } from 'react-redux';
import form, { State } from '../../../store/stencilForm';
import { formField } from '../../../store/form/reducer';
import { configure } from '../utils';

const {
    value,
    error,
    setValue
} = formField(form, 'textFromPCBSide');

const { value: include } = formField(form, 'includeTextFromPCBSide');

const Field = configure(Input, {
    id: form.id('textFromPCBSide'),
    required: true
});

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        disabled: !include(state),
        label: 'Текст страна платка (pcb)'
    }),
    {
        onValueChange: setValue
    }
)(Field);