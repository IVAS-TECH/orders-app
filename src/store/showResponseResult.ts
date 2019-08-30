import ResponseResult from './../type/ResponseResult';
import { createReducer } from './utils';

export const SHOW_RESPONSE_RESULT = 'ivas-tech/orders-app/showResponseResult/SHOW_RESPONSE_RESULT';

export const HIDE_RESPONSE_RESULT = 'ivas-tech/orders-app/showResponseResult/HIDE_RESPONSE_RESULT';

export interface ShowResponseResult {
    type: typeof SHOW_RESPONSE_RESULT,
    requestFor: ResponseResult
};

export interface HideResponseResult {
    type: typeof HIDE_RESPONSE_RESULT
};

export function showResponseResult(requestFor: ResponseResult): ShowResponseResult {
    return { type: SHOW_RESPONSE_RESULT, requestFor };
};

export function hideResponseResult(): HideResponseResult {
    return { type: HIDE_RESPONSE_RESULT };
};

export type State = null | ResponseResult;

const reducer = createReducer(null as State, {
    [SHOW_RESPONSE_RESULT]: (
        _state: State,
        { requestFor }: ShowResponseResult
    ) => requestFor,
    [HIDE_RESPONSE_RESULT]: (
        _state: State,
        _action: HideResponseResult
    ) => null
});

export default reducer;