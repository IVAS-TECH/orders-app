import CheckboxWithLabel from '../../CheckboxWithLabel'; 
import { connect } from 'react-redux';
import form, { State } from '../../../store/stencilForm';
import { formField } from '../../../store/form/reducer';
import { configure } from './../utils';

const {
    value,
    setValue
} = formField(form, 'nanoCoating');

const Field = configure(CheckboxWithLabel, {
    labelPlacement: 'start'
})

export default connect(
    (state: State) => ({
        checked: value(state),
        label: 'Нанопокритие:'
    }),
    {
        onToggle: setValue
    }
)(Field);