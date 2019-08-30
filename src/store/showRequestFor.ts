import RequestFor from './../type/RequestFor';
import { createReducer } from './utils';

export const SHOW_REQUEST_FOR = 'ivas-tech/orders-app/showRequestFor/SHOW_REQUEST_FOR';

export const HIDE_REQUEST_FOR = 'ivas-tech/orders-app/showRequestFor/HIDE_REQUEST_FOR';

export interface ShowRequestFor {
    type: typeof SHOW_REQUEST_FOR,
    requestFor: RequestFor
};

export interface HideRequestFor {
    type: typeof HIDE_REQUEST_FOR
};

export function showRequestFor(requestFor: RequestFor): ShowRequestFor {
    return { type: SHOW_REQUEST_FOR, requestFor };
};

export function hideRequestFor(): HideRequestFor {
    return { type: HIDE_REQUEST_FOR };
};

export type State = null | RequestFor;

const reducer = createReducer(null as State, {
    [SHOW_REQUEST_FOR]: (
        _state: State,
        { requestFor }: ShowRequestFor
    ) => requestFor,
    [HIDE_REQUEST_FOR]: (
        _state: State,
        _action: HideRequestFor
    ) => null
});

export default reducer;