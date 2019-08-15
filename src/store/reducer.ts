import {
    reducer as languageReducer,
    selector as languageSelector
} from './language/reducer';
import Language from './language/Language';
import stencilForm  from './stencilForm';
import stencilFormIsInvalidWarningReducer from './stencilFormIsInvalidWarning';
import orderPreviewReducer from './orderPreview';
import { combineReducers } from 'redux';

const reducerMap = {
    language: languageReducer,
    stencilForm: stencilForm.reducer,
    warnForStencilFormIsInvalid: stencilFormIsInvalidWarningReducer,
    orderPreview: orderPreviewReducer
};

const reducer = combineReducers(reducerMap);

export default reducer;

export type State = ReturnType<typeof reducer>;

type StateKey = keyof State;

export function extractState<Extract extends StateKey>(state: State, extract: Extract): State[Extract] {
    return state[extract];
}

export function selectLanguageValue(state: State): State['language'] {
    return extractState(state, 'language');
}

export function selectLanguage(state: State): Language {
    return languageSelector(extractState(state, 'language'));
}

export function selectStencilForm(state: State): State['stencilForm'] {
    return extractState(state, 'stencilForm');
}

export function selectWarnForStencilFormIsInvalid(state: State): State['warnForStencilFormIsInvalid'] {
    return extractState(state, 'warnForStencilFormIsInvalid');
}

export function selectPreviewOrder(state: State): State['orderPreview'] {
    return extractState(state, 'orderPreview');
}