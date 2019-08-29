import { combineReducers } from 'redux';
import form from './form';
import showErrorReducer from './showError';

const reducer = combineReducers({
    form: form.reducer,
    showError: showErrorReducer
});

export default reducer;