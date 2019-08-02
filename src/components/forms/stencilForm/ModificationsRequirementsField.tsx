import TextArea from './../../TextArea'; 
import { connect } from 'react-redux';
import form, { State } from './../../../store/stencilForm';
import { formField } from './../../../store/form/reducer';
import { configure } from './../utils';

const {
    value,
    setValue
} = formField(form, 'modificationsRequirements');

const Field = configure(TextArea, {
    initialRows: 7,
    expectedSymbolsPerRow: 79
});

export default connect(
    (state: State) => ({
        value: value(state),
        label: 'Изисквания',
        helperText: 'Моля, опишете всички изисквания за модификации на апертурите и позиционирането на образа'
    }),
    {
        onValueChange: setValue
    }
)(Field);