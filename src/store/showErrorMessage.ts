import { ErrorMessage } from '../type/ResponseError';
import { createReducer } from './utils';

export const SHOW_ERROR_MESSAGE = 'ivas-tech/orders-app/showErrorMessage/SHOW_ERROR_MESSAGE';

export const HIDE_ERROR_MESSAGE = 'ivas-tech/orders-app/showErrorMessage/HIDE_ERROR_MESSAGE';

export interface ShowErrorMessage {
    type: typeof SHOW_ERROR_MESSAGE,
    requestFor: ErrorMessage
};

export interface HideErrorMessage {
    type: typeof HIDE_ERROR_MESSAGE
};

export function showErrorMessage(requestFor: ErrorMessage): ShowErrorMessage {
    return { type: SHOW_ERROR_MESSAGE, requestFor };
};

export function hideErrorMessage(): HideErrorMessage {
    return { type: HIDE_ERROR_MESSAGE };
};

export type State = null | ErrorMessage;

const reducer = createReducer(null as State, {
    [SHOW_ERROR_MESSAGE]: (
        _state: State,
        { requestFor }: ShowErrorMessage
    ) => requestFor,
    [HIDE_ERROR_MESSAGE]: (
        _state: State,
        _action: HideErrorMessage
    ) => null
});

export default reducer;