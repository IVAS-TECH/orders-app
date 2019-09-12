import OrderInfo from './../type/OrderInfo';
import { createReducer } from './utils';

const LOAD_FROM_INITIAL_ORDER_FILTER_QUERY = 'ivas-tech/orders-app/filteredOrders/LOAD_FROM_INITIAL_ORDER_FILTER_QUERY';

export interface LoadFromInitialOrderFilterQuery {
    type: typeof LOAD_FROM_INITIAL_ORDER_FILTER_QUERY,
    count: number,
    firstPage: OrderInfo[]
};

export function loadFromInitialOrderFilterQuery(count: number, firstPage: OrderInfo[]): LoadFromInitialOrderFilterQuery {
    return { type: LOAD_FROM_INITIAL_ORDER_FILTER_QUERY, count, firstPage };
};

export interface State {
    count: number,
    ordersPerPage: number,
    pageNumber: number,
    currentPage: OrderInfo[],
    cachedPages: Array<OrderInfo[]>
};

export const pageSize = 100;

export const ordersPerPageOptions = [5, 10, 20];

const initialState: State = {
    count: 0,
    ordersPerPage: ordersPerPageOptions[0],
    pageNumber: 0,
    currentPage: [],
    cachedPages: [[]]
};

const reducer = createReducer(initialState, {
    [LOAD_FROM_INITIAL_ORDER_FILTER_QUERY]: (
        _state: State,
        { count, firstPage }: LoadFromInitialOrderFilterQuery
    ) => {
        let ordersPerPage = ordersPerPageOptions[0];
        for(let i = 1; i < ordersPerPageOptions.length; ++i) {
            if(count > (3 * ordersPerPageOptions[i - 1])) {
                ordersPerPage = ordersPerPageOptions[i];
            }
        }
        return {
            count,
            ordersPerPage,
            pageNumber: 0,
            currentPage: firstPage.slice(0, ordersPerPage),
            cachedPages: [firstPage]
        };
    }
});

export default reducer;