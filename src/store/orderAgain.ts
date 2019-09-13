import { createReducer } from './utils';
import { SET_FORM_STATE_VALUES, SetFormStateValues } from './form/reducer';
import stencilForm, { Fields, CREATED_ORDER, CreatedOrder } from './stencilForm';

export const CLOSE_ORDER_AGAIN = 'ivas-tech/orders-app/orderAgain/CLOSE_ORDER_AGAIN';

export interface CloseOrderAgain {
    type: typeof CLOSE_ORDER_AGAIN
};

export function closeOrderAgain(): CloseOrderAgain {
    return { type: CLOSE_ORDER_AGAIN };
};

const reducer = createReducer(false, {
    [SET_FORM_STATE_VALUES]: (
        state: boolean,
        action: SetFormStateValues<Fields>
    ) => stencilForm.shouldHandleAction(action) ? true : state,
    [CLOSE_ORDER_AGAIN]: (
        _state: boolean,
        _action: CloseOrderAgain
    ) => false,
    [CREATED_ORDER]: (
        _state: boolean,
        _action: CreatedOrder
    ) => false
});

export default reducer;