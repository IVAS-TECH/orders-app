import { createReducer } from './utils';
import { OrderData } from '../type/OrderData';

export const VIEW_ORDER = 'ivas-tech/orders-app/viewOrder/VIEW_ORDER';

export const CLOSE_VIEW_ORDER = 'ivas-tech/orders-app/viewOrder/CLOSE_VIEW_ORDER';

export interface ViewOrder {
    type: typeof VIEW_ORDER,
    orderData: OrderData
};

export interface CloseViewOrder {
    type: typeof CLOSE_VIEW_ORDER
};

export function viewOrder(orderData: OrderData): ViewOrder {
    return { type: VIEW_ORDER, orderData };
};

export function closeViewOrder(): CloseViewOrder {
    return { type: CLOSE_VIEW_ORDER };
};

export type State = null | OrderData;

const reducer = createReducer(null as State, {
    [VIEW_ORDER]: (
        _state: State,
        { orderData }: ViewOrder
    ) => orderData,
    [CLOSE_VIEW_ORDER]: (
        _state: State,
        _action: CloseViewOrder
    ) => null
});

export default reducer;