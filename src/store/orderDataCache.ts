import { OrderData } from './../type/OrderData';
import { createReducer } from './utils';

export const CACHE_ORDER_DATA = 'ivas-tech/orders-app/orderDataCache/CACHE_ORDER_DATA';

export interface CacheOrderData {
    type: typeof CACHE_ORDER_DATA,
    id: string,
    orderData: OrderData;
};

export function cacheOrderData(id: string, orderData: OrderData): CacheOrderData {
    return { type: CACHE_ORDER_DATA, id, orderData };
};

export type State = Record<string, OrderData>;

const initialState: State = { };

const reducer = createReducer(initialState, {
    [CACHE_ORDER_DATA]: (
        state: State,
        { id, orderData }: CacheOrderData
    ) => ({ ...state, [id]: orderData })
});

export default reducer;