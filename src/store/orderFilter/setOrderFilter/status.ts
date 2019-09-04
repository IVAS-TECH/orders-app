import keyedFilter, { selectPicked } from './keyedFilter';
import OrderStatus from '../../../type/OrderStatus';
import { KeyedFilter } from '../../../type/OrderFilter';

const TOGGLE_KEY = 'ivas-tech/orders-app/orderFilter/status/TOGGLE_KEY';

const status = keyedFilter<typeof TOGGLE_KEY, OrderStatus>(TOGGLE_KEY, {
    waiting: true,
    accepted: true,
    rejected: true,
    canceled: true,
    processing: true,
    ready: true,
    delivered: true
});

const order: Array<OrderStatus> = [
    'waiting',
    'accepted',
    'rejected',
    'canceled',
    'processing',
    'ready',
    'delivered'
];

const { toggleKey } = status.action;

export { toggleKey, order };

export default status.reducer;

export function selectPickedFromStatus(filter: KeyedFilter<OrderStatus>): Array<OrderStatus> {
    return selectPicked(filter, order);
}