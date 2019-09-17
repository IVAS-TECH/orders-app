import OrderInfo from './../type/OrderInfo';
import { createReducer } from './utils';

const LOAD_FROM_INITIAL_ORDER_FILTER_QUERY = 'ivas-tech/orders-app/filteredOrders/LOAD_FROM_INITIAL_ORDER_FILTER_QUERY';

const CHANGE_ORDERS_PER_PAGE = 'ivas-tech/orders-app/filteredOrders/CHANGE_ORDERS_PER_PAGE';

export interface LoadFromInitialOrderFilterQuery {
    type: typeof LOAD_FROM_INITIAL_ORDER_FILTER_QUERY,
    count: number,
    firstPage: OrderInfo[]
};

export interface ChangeOrdersPerPage {
    type: typeof CHANGE_ORDERS_PER_PAGE,
    ordersPerPage: number
};

export function loadFromInitialOrderFilterQuery(count: number, firstPage: OrderInfo[]): LoadFromInitialOrderFilterQuery {
    return { type: LOAD_FROM_INITIAL_ORDER_FILTER_QUERY, count, firstPage };
};

export function changeOrdersPerPage(ordersPerPage: number): ChangeOrdersPerPage {
    return { type: CHANGE_ORDERS_PER_PAGE, ordersPerPage };
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
    },
    [CHANGE_ORDERS_PER_PAGE]: (
        state: State,
        { ordersPerPage }: ChangeOrdersPerPage
    ) => {
        if(ordersPerPage === state.ordersPerPage) {
            return state;
        }
        const currentOrdersPerPage = state.ordersPerPage;
        const currentPageNumber = state.pageNumber;
        const { count, cachedPages } = state;
        const viewedOrders = (currentPageNumber + (ordersPerPage > currentOrdersPerPage ? 1 : 0)) * currentOrdersPerPage;
        const cachedPageIndex = Math.floor(viewedOrders / pageSize);
        const viewedOrdersFromCurrentCachedPage = viewedOrders % pageSize;
        const offsetFromCurrentCachedPage = Math.floor(viewedOrdersFromCurrentCachedPage / ordersPerPage);
        const skipFromCurrentCachedPage = offsetFromCurrentCachedPage * ordersPerPage;
        const currentPage = cachedPages[cachedPageIndex].slice(skipFromCurrentCachedPage, skipFromCurrentCachedPage + ordersPerPage);
        const pageNumber = (cachedPageIndex * ordersPerPage) + offsetFromCurrentCachedPage;
        return {
            count,
            ordersPerPage,
            pageNumber,
            currentPage,
            cachedPages
        };
    }
});

export default reducer;