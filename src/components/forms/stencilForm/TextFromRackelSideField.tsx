import Input from '../../Input'; 
import { connect } from 'react-redux';
import form, { State } from '../../../store/stencilForm';
import { formField } from '../../../store/form/reducer';
import { configure } from '../utils';

const {
    value,
    error,
    setValue
} = formField(form, 'textFromRackelSide');

const { value: include } = formField(form, 'includeTextFromRackelSide');

const Field = configure(Input, {
    id: form.id('textFromRackelSide'),
    required: true
});

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        disabled: !include(state),
        label: 'Текст страна ракел (rackel)'
    }),
    {
        onValueChange: setValue
    }
)(Field);