import NumberInput from './../../NumberInput'; 
import { connect } from 'react-redux';
import form, { State } from './../../../store/stencilForm';
import { formField } from './../../../store/form/reducer';

const {
    value,
    error,
    setValue
} = formField(form, 'count');

const id = form.id('count');

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        label: 'Брой*',
        integer: true,
        id
    }),
    {
        onValueChange: setValue
    }
)(NumberInput);