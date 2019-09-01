import { connect } from 'react-redux';
import PickFromList, { PickFromListProps } from './../../../../../pick/PickFromList';
import { State, selectSetOrderFilter } from './../../../../../../store/reducer';
import { selectOrderedBy, toggleOrderedBy } from '../../../../../../store/orderFilter/setOrderFilter/orderFilter';

const PickFromOrderedByList: React.FC<PickFromListProps<string>> = PickFromList;

const OrderedBy = connect(
    (state: State) => {
        const { idFilter, name } = selectOrderedBy(selectSetOrderFilter(state));
        return { listPick: idFilter, text: name };
    },
    { onToggleFromList: toggleOrderedBy }
)(PickFromOrderedByList);

export default OrderedBy;