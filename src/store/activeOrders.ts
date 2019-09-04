import OrderInfo from './../type/OrderInfo';
import { createReducer } from './utils';

export const LOAD_ACTIVE_ORDERS = 'ivas-tech/orders-app/activeOrders/LOAD_ACTIVE_ORDERS';

export interface LoadActiveOrders {
    type: typeof LOAD_ACTIVE_ORDERS,
    activeOrders: OrderInfo[]
};

export function loadActiveOrders(activeOrders: OrderInfo[]): LoadActiveOrders {
    return { type: LOAD_ACTIVE_ORDERS, activeOrders };
};

const noOrders: OrderInfo[] = [];

const reducer = createReducer(noOrders, {
    [LOAD_ACTIVE_ORDERS]: (
        _state: OrderInfo[],
        { activeOrders }: LoadActiveOrders
    ) => activeOrders
});

export default reducer;