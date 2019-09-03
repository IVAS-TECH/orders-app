import { createReducer } from './utils';
import { CREATED_ORDER } from './stencilForm';

export const OPEN_ORDER_PREVIEW = 'ivas-tech/orders-app/orderPreview/OPEN_ORDER_PREVIEW';

export const CLOSE_ORDER_PREVIEW = 'ivas-tech/orders-app/orderPreview/CLOSE_ORDER_PREVIEW';

export interface OpenOrderPreview {
    type: typeof OPEN_ORDER_PREVIEW
};

export interface CloseOrderPreview {
    type: typeof CLOSE_ORDER_PREVIEW
};

export function openOrderPreview(): OpenOrderPreview {
    return { type: OPEN_ORDER_PREVIEW };
};

export function closeOrderPreview(): CloseOrderPreview {
    return { type: CLOSE_ORDER_PREVIEW };
};

const reducer = createReducer(false, {
    [OPEN_ORDER_PREVIEW]: (
        _state: boolean,
        _action: OpenOrderPreview
    ) => true,
    [CLOSE_ORDER_PREVIEW]: (
        _state: boolean,
        _action: CloseOrderPreview
    ) => false,
    [CREATED_ORDER]: (
        _state: boolean,
        _action: { type: typeof CREATED_ORDER }
     ) => false
});

export default reducer;