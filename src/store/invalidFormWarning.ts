import { createReducer } from './utils';
import { SHOW_ERRORS } from './form/type';

export const CLOSE_INVALID_FORM_WARNING = 'ivas-tech/orders-app/invalidFormWarning/CLOSE_INVALID_FORM_WARNING';

export interface CloseInvalidFormWarning {
    type: typeof CLOSE_INVALID_FORM_WARNING
};

export function closeInvalidFormWarning(): CloseInvalidFormWarning {
    return { type: CLOSE_INVALID_FORM_WARNING };
};

const reducer = createReducer(false, {
    [SHOW_ERRORS]: (
        _state: boolean,
        _action: { type: typeof SHOW_ERRORS }
    ) => true,
    [CLOSE_INVALID_FORM_WARNING]: (
        _state: boolean,
        _action: CloseInvalidFormWarning
    ) => false
});

export default reducer;