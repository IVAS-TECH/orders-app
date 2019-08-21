import {
    reducer as languageReducer,
    selector as languageSelector
} from './language/reducer';
import Language from './language/Language';
import stencilForm  from './stencilForm';
import invalidFormWarningReducer from './invalidFormWarning';
import orderPreviewReducer from './orderPreview';
import tabReducer from './tab';
import orderFilterReducer, {
    selectCurrentOrderFilter as _selectCurrentOrderFilter,
    selectSetOrderFilter as _selectSetOrderFilter
} from './orderFilter/orderFilter';
import changeOrderFilterReducer from './changeOrderFilter';
import { combineReducers } from 'redux';

const reducerMap = {
    language: languageReducer,
    stencilForm: stencilForm.reducer,
    invalidFormWarning: invalidFormWarningReducer,
    orderPreview: orderPreviewReducer,
    tab: tabReducer,
    orderFilter: orderFilterReducer,
    changeOrderFilter: changeOrderFilterReducer
};

const reducer = combineReducers(reducerMap);

export default reducer;

export type State = ReturnType<typeof reducer>;

export function selectLanguageValue(state: State): State['language'] {
    return state.language;
};

export function selectLanguage(state: State): Language {
    return languageSelector(state.language);
};

export function selectStencilForm(state: State): State['stencilForm'] {
    return state.stencilForm;
};

export function selectInvalidFormWarning(state: State): State['invalidFormWarning'] {
    return state.invalidFormWarning;
};

export function selectPreviewOrder(state: State): State['orderPreview'] {
    return state.orderPreview;
};

export function selectTab(state: State): State['tab'] {
    return state.tab;
};

export function selectSetOrderFilter(state: State): ReturnType<typeof _selectSetOrderFilter> {
    return _selectSetOrderFilter(state.orderFilter);
};

export function selectCurrentOrderFilter(state: State): ReturnType<typeof _selectCurrentOrderFilter> {
    return _selectCurrentOrderFilter(state.orderFilter);
};

export function selectChangeOrderFilter(state: State): State['changeOrderFilter'] {
    return state.changeOrderFilter;
};