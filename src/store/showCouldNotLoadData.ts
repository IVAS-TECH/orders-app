import Action from './../type/Action';

export const SHOW_COULD_NOT_LOAD_DATA = 'ivas-tech/orders-app/showCouldNotLoadData/SHOW_COULD_NOT_LOAD_DATA';

export interface ShowCouldNotLoadData {
    type: typeof SHOW_COULD_NOT_LOAD_DATA,
    retryAction: Action
};

export function showCouldNotLoadData(retryAction: Action): ShowCouldNotLoadData {
    return { type: SHOW_COULD_NOT_LOAD_DATA, retryAction };
};

export type State = null | Action;

function reducer(_state: State = null, action: Action): State {
    if(isShowCouldNotLoadData(action)) {
        return action.retryAction;
    }
    return null;
}

export default reducer;

function isShowCouldNotLoadData(action: Action): action is ShowCouldNotLoadData {
    return action.type === SHOW_COULD_NOT_LOAD_DATA;
}