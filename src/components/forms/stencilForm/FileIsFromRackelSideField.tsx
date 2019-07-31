import CheckboxWithLabel from './../../CheckboxWithLabel'; 
import { connect } from 'react-redux';
import form, { State } from './../../../store/stencilForm';
import { formField } from './../../../store/form/reducer';

const {
    value,
    setValue
} = formField(form, 'fileIsFromRackelSide');

export default connect(
    (state: State) => ({
        checked: value(state),
        label: 'Файлът е изглед от страна ракел?',
        labelPlacement: 'start' as 'start'
    }),
    {
        onToggle: setValue
    }
)(CheckboxWithLabel);