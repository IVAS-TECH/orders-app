import NumberInput from './../../NumberInput'; 
import { connect } from 'react-redux';
import form, { State } from './../../../store/stencilForm';
import { formField } from './../../../store/form/reducer';
import { configure } from './../utils';

const {
    value,
    error,
    setValue
} = formField(form, 'count');

const Field = configure(NumberInput, {
    id: form.id('count'),
    integer: true
});

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        label: 'Брой*'
    }),
    {
        onValueChange: setValue
    }
)(Field);