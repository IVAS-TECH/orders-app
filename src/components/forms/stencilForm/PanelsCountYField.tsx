import NumberInput from '../../NumberInput'; 
import { connect } from 'react-redux';
import form, { State } from '../../../store/stencilForm';
import { formField } from '../../../store/form/reducer';
import { configure } from '../utils';

const {
    value,
    error,
    setValue
} = formField(form, 'panelsCountY');

const Field = configure(NumberInput, {
    id: form.id('panelsCountY'),
    integer: true,
    required: true
});

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        label: 'Брой панели по Y'
    }),
    {
        onValueChange: setValue
    }
)(Field);