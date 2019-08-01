import Input from './../../Input'; 
import { connect } from 'react-redux';
import form, { State } from './../../../store/stencilForm';
import { formField } from './../../../store/form/reducer';
import { configure } from './../utils';

const {
    value,
    error,
    setValue
} = formField(form, 'file');

const Field = configure(Input, {
    id: form.id('file')
});

export default connect(
    (state: State) => ({
        value: value(state),
        error: error(state),
        label: 'Файлов архив*'
    }),
    {
        onValueChange: setValue
    }
)(Field);