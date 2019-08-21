import { createReducer } from './utils';
import { RESET_FILTER_STEP } from './orderFilter/setOrderFilter/setFilterStep';
import { SET_CURRENT_ORDER_FILTER } from './orderFilter/orderFilter';

export const CLOSE_CHANGE_ORDER_FILTER = 'ivas-tech/orders-app/changeOrderFilters/CLOSE_CHANGE_ORDER_FILTER';

export interface CloseChangeOrderFilter {
    type: typeof CLOSE_CHANGE_ORDER_FILTER
};

export function closeChangeOrderFilter(): CloseChangeOrderFilter {
    return { type: CLOSE_CHANGE_ORDER_FILTER };
}

const reducer = createReducer(false, {
    [RESET_FILTER_STEP]: (
        _state: boolean,
        _action: { type: typeof RESET_FILTER_STEP }
    ) => true,
    [SET_CURRENT_ORDER_FILTER]: (
        _state: boolean,
        _action: { type: typeof SET_CURRENT_ORDER_FILTER }
    ) => false,
    [CLOSE_CHANGE_ORDER_FILTER]: (
        _state: boolean,
        _action: CloseChangeOrderFilter
    ) => false
});

export default reducer;