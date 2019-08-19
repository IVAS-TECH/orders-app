import { createReducer } from './utils';

export const OPEN_STENCIL_FORM_IS_INVALID_WARNING = 'ivas-tech/orders-app/stencilFormIsInvalidWarning/OPEN_STENCIL_FORM_IS_INVALID_WARNING';

export const CLOSE_STENCIL_FORM_IS_INVALID_WARNING = 'ivas-tech/orders-app/stencilFormIsInvalidWarning/CLOSE_STENCIL_FORM_IS_INVALID_WARNING';

export interface OpenStencilFormIsInvalidWarning {
    type: typeof OPEN_STENCIL_FORM_IS_INVALID_WARNING
};

export interface CloseStencilFormIsInvalidWarning {
    type: typeof CLOSE_STENCIL_FORM_IS_INVALID_WARNING
};

export function openStencilFormIsInvalidWarning(): OpenStencilFormIsInvalidWarning {
    return { type: OPEN_STENCIL_FORM_IS_INVALID_WARNING };
};

export function closeStencilFormIsInvalidWarning(): CloseStencilFormIsInvalidWarning {
    return { type: CLOSE_STENCIL_FORM_IS_INVALID_WARNING };
};

const reducer = createReducer(false, {
    [OPEN_STENCIL_FORM_IS_INVALID_WARNING]: (
        _state: boolean,
        _action: OpenStencilFormIsInvalidWarning
    ) => true,
    [CLOSE_STENCIL_FORM_IS_INVALID_WARNING]: (
        _state: boolean,
        _action: CloseStencilFormIsInvalidWarning
    ) => false
});

export default reducer;