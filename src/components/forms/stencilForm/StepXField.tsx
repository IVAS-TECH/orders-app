import NumberInput from '../../NumberInput'; 
import { connect } from 'react-redux';
import form, { State } from '../../../store/stencilForm';
import { formField } from '../../../store/form/reducer';
import { configure } from '../utils';

const {
    value,
    error,
    setValue
} = formField(form, 'stepX');

const Field = configure(NumberInput, {
    id: form.id('stepX'),
    integer: true,
    required: true
});

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        label: 'Стъпка по X (mm)'
    }),
    {
        onValueChange: setValue
    }
)(Field);