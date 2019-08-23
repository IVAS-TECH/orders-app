import { connect } from 'react-redux';
import { configure } from './../../../../../utils';
import TextInput from '../../../../../formControl/TextInput';
import { State, selectSetOrderFilter } from './../../../../../../store/reducer';
import { selectFileName, setFileName } from '../../../../../../store/orderFilter/setOrderFilter/orderFilter';

const Field = configure(TextInput, { id: 'order-filter-file-name' });

const FileName = connect(
    (state: State) => ({ value : selectFileName(selectSetOrderFilter(state)) }),
    { onValueChange: setFileName }
)(Field);

export default FileName;