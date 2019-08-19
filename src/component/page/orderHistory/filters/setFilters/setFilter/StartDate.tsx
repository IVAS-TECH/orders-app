import { connect } from 'react-redux';
import DatePicker from '../../../../../pick/DatePicker';
import { State, selectSetOrderFilter } from './../../../../../../store/reducer';
import { selectStartDate, setStartDate } from '../../../../../../store/orderFilter/setOrderFilter/orderFilter';

const StartDate = connect(
    (state: State) => ({ value: selectStartDate(selectSetOrderFilter(state)) }),
    { onChange: setStartDate }
)(DatePicker);

export default StartDate;