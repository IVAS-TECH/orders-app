import { connect } from 'react-redux';
import { configure } from './../../../../../utils';
import Input from './../../../../../formControl/Input';
import { State, selectSetOrderFilter } from './../../../../../../store/reducer';
import { selectFileName, setFileName } from '../../../../../../store/orderFilter/setOrderFilter/orderFilter';

const Field = configure(Input, { id: 'order-filter-file-name' });

const FileName = connect(
    (state: State) => ({
        value : selectFileName(selectSetOrderFilter(state)),
        label: 'File name'
    }),
    { onValueChange: setFileName }
)(Field);

export default FileName;