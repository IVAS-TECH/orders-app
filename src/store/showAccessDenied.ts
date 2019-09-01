import { createReducer } from './utils';
import { LOGOUT, Logout } from './user';

export const SHOW_ACCESS_DENIED = 'ivas-tech/orders-app/showAccessDenied/SHOW_ACCESS_DENIED';

export interface ShowAccessDenied {
    type: typeof SHOW_ACCESS_DENIED
};

export function showAccessDenied(): ShowAccessDenied {
    return { type: SHOW_ACCESS_DENIED };
};

const reducer = createReducer(false, {
    [SHOW_ACCESS_DENIED]: (
        _state: boolean,
        _action: ShowAccessDenied
    ) => true,
    [LOGOUT]: (
        _state: boolean,
        _action: Logout
    ) => false
});

export default reducer;