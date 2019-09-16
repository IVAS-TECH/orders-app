import { combineReducers } from 'redux';
import showInviteToOrganizationReducer from './showInviteToOrganization';
import inviteUserForm from './inviteUserForm';
import showErrorReducer from './showError';

const reducer = combineReducers({
    showInviteToOrganization: showInviteToOrganizationReducer,
    inviteUserForm: inviteUserForm.reducer,
    showError: showErrorReducer
});

export default reducer;