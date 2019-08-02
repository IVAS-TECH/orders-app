import Select, { SelectProps }  from './../../Select'; 
import { connect } from 'react-redux';
import form, { FidushalMarksSide, State } from './../../../store/stencilForm';
import { formField } from './../../../store/form/reducer';
import { configure } from './../utils';

const {
    value,
    error,
    setValue
} = formField(form, 'fidushalMarksSide');

const FidushalMarksSideSelect: React.FC<SelectProps<FidushalMarksSide>> = Select;

const Field = configure(FidushalMarksSideSelect, {
    id: form.id('fidushalMarksSide'),
    required: true
});

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        label: 'Страна на марките',
        notSelectedText: 'Не избрана',
        options: [{
                value: 'pcb' as 'pcb',
                text: 'Страна платка (pcb)'
            }, {
                value: 'rackel' as 'rackel',
                text: 'Страна ракел (rackel)'
            }, {
                value: 'two-sided' as 'two-sided',
                text: 'Двустранно'
            }]

    }),
    {
        onValueChange: setValue
    }
)(Field);