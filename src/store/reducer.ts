import { combineReducers } from 'redux';
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
import userReducer from './user';
import loginFormReducer  from './loginForm/loginForm';
import organizationManagerFormReducer  from './organizationManagerForm/organizationManagerForm';
import registerFormReducer  from './registerForm/registerForm';
import showErrorMessageReducer from './showErrorMessage';
import showRequestForReducer from './showRequestFor';
import showRequestResultReducer from './showRequestResult';
import showAccessDeniedReducer from './showAccessDenied';
import showCouldNotLoadDataReducer from './showCouldNotLoadData';
import activeOrdersReducer from './activeOrders';
import viewOrderReducer from './viewOrder';
import orderDataCacheReducer from './orderDataCache';
import filteredOrdersReducer from './filteredOrders';
import orderAgainReducer from './orderAgain';
import organizationReducer from './organization';
import inviteToOrganizationReducer from './inviteToOrganization/reducer';

const reducerMap = {
    language: languageReducer,
    stencilForm: stencilForm.reducer,
    invalidFormWarning: invalidFormWarningReducer,
    orderPreview: orderPreviewReducer,
    location: locationReducer,
    orderFilter: orderFilterReducer,
    changeOrderFilter: changeOrderFilterReducer,
    user: userReducer,
    loginForm: loginFormReducer,
    organizationManagerForm: organizationManagerFormReducer,
    registerForm: registerFormReducer,
    showErrorMessage: showErrorMessageReducer,
    showRequestFor: showRequestForReducer,
    showRequestResult: showRequestResultReducer,
    showAccessDenied: showAccessDeniedReducer,
    showCouldNotLoadData: showCouldNotLoadDataReducer,
    activeOrders: activeOrdersReducer,
    viewOrder: viewOrderReducer,
    orderDataCache: orderDataCacheReducer,
    filteredOrders: filteredOrdersReducer,
    orderAgain: orderAgainReducer,
    organization: organizationReducer,
    inviteToOrganization: inviteToOrganizationReducer
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

export function selectUser(state: State): State['user'] {
    return state.user;
};

export function selectLoginForm(state: State): State['loginForm']['form'] {
    return state.loginForm.form;
};

export function selectShowLoginError(state: State): State['loginForm']['showError'] {
    return state.loginForm.showError;
};

export function selectOrganizationManagerForm(state: State): State['organizationManagerForm']['form'] {
    return state.organizationManagerForm.form;
};

export function selectShowOrganizationManagerError(state: State): State['organizationManagerForm']['showError'] {
    return state.organizationManagerForm.showError;
};

export function selectRegisterForm(state: State): State['registerForm']['form'] {
    return state.registerForm.form;
};

export function selectShowRegisterError(state: State): State['registerForm']['showError'] {
    return state.registerForm.showError;
};

export function selectShowErrorMessage(state: State): State['showErrorMessage'] {
    return state.showErrorMessage;
};

export function selectShowRequestFor(state: State): State['showRequestFor'] {
    return state.showRequestFor;
};

export function selectShowRequestResult(state: State): State['showRequestResult'] {
    return state.showRequestResult;
};

export function selectShowAccessDenied(state: State): State['showAccessDenied'] {
    return state.showAccessDenied;
};

export function selectShowCouldNotLoadData(state: State): State['showCouldNotLoadData'] {
    return state.showCouldNotLoadData;
};

export function selectActiveOrders(state: State): State['activeOrders'] {
    return state.activeOrders;
};

export function selectViewOrder(state: State): State['viewOrder'] {
    return state.viewOrder;
};

export function selectOrderDataCache(state: State): State['orderDataCache'] {
    return state.orderDataCache;
};

export function selectFilteredOrders(state: State): State['filteredOrders'] {
    return state.filteredOrders;
};

export function selectOrderAgain(state: State): State['orderAgain'] {
    return state.orderAgain;
};

export function selectOrganization(state: State): State['organization'] {
    return state.organization;
};

export function selectShowInviteToOrganization(state: State): State['inviteToOrganization']['showInviteToOrganization'] {
    return state.inviteToOrganization.showInviteToOrganization;
};

export function selectInviteUserForm(state: State): State['inviteToOrganization']['inviteUserForm'] {
    return state.inviteToOrganization.inviteUserForm;
};

export function selectShowInviteUserError(state: State): State['inviteToOrganization']['showError'] {
    return state.inviteToOrganization.showError;
};