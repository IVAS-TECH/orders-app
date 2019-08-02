import Select, { SelectProps }  from './../../Select'; 
import { connect } from 'react-redux';
import form, { FidushalMarksKind, State } from './../../../store/stencilForm';
import { formField } from './../../../store/form/reducer';
import { configure } from './../utils';

const {
    value,
    error,
    setValue
} = formField(form, 'fidushalMarksKind');

const FidushalMarksKindSelect: React.FC<SelectProps<FidushalMarksKind>> = Select;

const Field = configure(FidushalMarksKindSelect, {
    id: form.id('fidushalMarksKind'),
    required: true
});

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        label: 'Вид на марките',
        notSelectedText: 'Без марки',
        options: [{
                value: 'graved' as 'graved',
                text: 'Гравирани'
            }, {
                value: 'cut' as 'cut',
                text: 'Прорязани'
            }]

    }),
    {
        onValueChange: setValue
    }
)(Field);