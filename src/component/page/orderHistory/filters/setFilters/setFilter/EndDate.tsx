import { connect } from 'react-redux';
import DatePicker from '../../../../../pick/DatePicker';
import { State, selectSetOrderFilter } from './../../../../../../store/reducer';
import { selectStartDate, selectEndDate, setEndDate } from '../../../../../../store/orderFilter/setOrderFilter/orderFilter';

const EndDate = connect(
    (state: State) => {
        const orderFilterState = selectSetOrderFilter(state);
        return {
            value: selectEndDate(orderFilterState),
            minDate: selectStartDate(orderFilterState)
        };
    }, { onChange: setEndDate }
)(DatePicker);

export default EndDate;