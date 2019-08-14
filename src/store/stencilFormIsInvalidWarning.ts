import stencilForm from './stencilForm';
import { SHOW_ERRORS, ShowErrors } from './form/type';
import { createReducer } from './utils';

export const CLOSE_STENCIL_FORM_IS_INVALID_WARNING = 'ivas-tech/orders-app/stencilFormIsInvalidWarning/CLOSE_STENCIL_FORM_IS_INVALID_WARNING';

export interface CloseStencilFormIsInvalidWarning {
    type: typeof CLOSE_STENCIL_FORM_IS_INVALID_WARNING
};

export function closeStencilFormIsInvalidWarning(): CloseStencilFormIsInvalidWarning {
    return { type: CLOSE_STENCIL_FORM_IS_INVALID_WARNING };
};

const reducer = createReducer(false, {
    [SHOW_ERRORS]: (
        state: boolean,
        action: ShowErrors
    ) => stencilForm.shouldTakeAction(action) ? true : state,
    [CLOSE_STENCIL_FORM_IS_INVALID_WARNING]: (
        _state: boolean,
        _action: CloseStencilFormIsInvalidWarning
    ) => false
});

export default reducer;