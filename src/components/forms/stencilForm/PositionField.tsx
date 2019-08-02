import Select, { SelectProps }  from '../../Select'; 
import { connect } from 'react-redux';
import form, { Position, State } from '../../../store/stencilForm';
import { formField } from '../../../store/form/reducer';
import { configure } from '../utils';

const {
    value,
    error,
    setValue
} = formField(form, 'position');

const PositionSelect: React.FC<SelectProps<Position>> = Select;

const Field = configure(PositionSelect, {
    id: form.id('position'),
    required: true
});

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        label: 'Позициониране',
        notSelectedText: 'Не избрано',
        options: [{
                value: 'layout-centered' as 'layout-centered',
                text: 'Layout Centered'
            }, {
                value: 'pcb-centered' as 'pcb-centered',
                text: 'PCB Centered'
            }]

    }),
    {
        onValueChange: setValue
    }
)(Field);