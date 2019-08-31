import RequestResult from '../type/RequestResult';
import { createReducer } from './utils';

export const SHOW_REQUEST_RESULT = 'ivas-tech/orders-app/showRequestResult/SHOW_REQUEST_RESULT';

export const HIDE_REQUEST_RESULT = 'ivas-tech/orders-app/showRequestResult/HIDE_REQUEST_RESULT';

export interface ShowRequestResult {
    type: typeof SHOW_REQUEST_RESULT,
    requestResult: RequestResult
};

export interface HideRequestResult {
    type: typeof HIDE_REQUEST_RESULT
};

export function showRequestResult(requestResult: RequestResult): ShowRequestResult {
    return { type: SHOW_REQUEST_RESULT, requestResult };
};

export function hideRequestResult(): HideRequestResult {
    return { type: HIDE_REQUEST_RESULT };
};

export type State = null | RequestResult;

const reducer = createReducer(null as State, {
    [SHOW_REQUEST_RESULT]: (
        _state: State,
        { requestResult }: ShowRequestResult
    ) => requestResult,
    [HIDE_REQUEST_RESULT]: (
        _state: State,
        _action: HideRequestResult
    ) => null
});

export default reducer;