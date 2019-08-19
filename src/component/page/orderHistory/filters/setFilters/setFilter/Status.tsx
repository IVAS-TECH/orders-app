import { connect } from 'react-redux';
import { configure } from './../../../../../utils';
import PickFromList, { PickFromListProps } from './../../../../../pick/PickFromList';
import { State, selectSetOrderFilter } from './../../../../../../store/reducer';
import { selectStatus, toggleStatus, statusOrder } from '../../../../../../store/orderFilter/setOrderFilter/orderFilter';
import { OrderStatus } from './../../../../../../type/OrderFilter';;

const PickFromStatusList: React.FC<PickFromListProps<OrderStatus>> = PickFromList;

const Picker = configure(PickFromStatusList, {
    order: statusOrder,
    text: {
        waiting: 'Waiting',
        accepted: 'Accepted',
        rejected: 'Rejected',
        canceled: 'Canceled',
        processing: 'Processing',
        ready: 'Ready',
        delivered: 'Delivered'
    }
});

const Status = connect(
    (state: State) => ({ listPick: selectStatus(selectSetOrderFilter(state)) }),
    { onToggleFromList: toggleStatus }
)(Picker);

export default Status;