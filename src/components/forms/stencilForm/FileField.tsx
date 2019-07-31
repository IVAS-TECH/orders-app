import Input from './../../Input'; 
import { connect } from 'react-redux';
import form, { State } from './../../../store/stencilForm';
import { formField } from './../../../store/form/reducer';

const {
    value,
    error,
    setValue
} = formField(form, 'file');

const id = form.id('file');

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        label: 'Файлов архив*',
        id
    }),
    {
        onValueChange: setValue
    }
)(Input);