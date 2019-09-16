import { createReducer } from './utils';
import User, { UserRole } from './../type/User';

export const LOGIN = 'ivas-tech/orders-app/user/LOGIN';

export const LOGOUT = 'ivas-tech/orders-app/user/LOGOUT';

export interface Login {
    type: typeof LOGIN,
    user: User
};

export interface Logout {
    type: typeof LOGOUT
};

export function login(user: User): Login {
    return { type: LOGIN, user };
};

export function logout(): Logout {
    return { type: LOGOUT };
};

export type State = null | User;

const reducer = createReducer(null as State, {
    [LOGIN]: (
        _state: State,
        { user }: Login
    ) => user,
    [LOGOUT]: (
        _state: State,
        _action: Logout
    ) => null
});

export function selectAuthToken(state: State): string {
    return state === null ? '' : state.authToken;
};

export function selectUserName(state: State): string {
    return state === null ? '' : state.name;
};

export function selectUserRole(state: State): UserRole {
    return state === null ? 'unknown' : state.role;
};

export function selectIsLoggedIn(state: State): boolean {
    return selectUserName(state) !== '';
};

export default reducer;