import languageReducer from './language';
import stencilForm  from './stencilForm';
import invalidFormWarningReducer from './invalidFormWarning';
import orderPreviewReducer from './orderPreview';
import locationReducer from './location/reducer';
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
    location: locationReducer,
    orderFilter: orderFilterReducer,
    changeOrderFilter: changeOrderFilterReducer
};

const reducer = combineReducers(reducerMap);

export default reducer;

export type State = ReturnType<typeof reducer>;

export function selectLanguage(state: State): State['language'] {
    return state.language;
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

export function selectLocation(state: State): State['location'] {
    return state.location;
};

export function selectRoute(state: State): State['location']['type'] {
    return state.location.type;
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