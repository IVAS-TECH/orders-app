import { select, put } from 'redux-saga/effects';
import { navigateToSignIn, navigateToActiveOrders } from './../location/route';
import { State, selectUser } from './../reducer';
import { selectIsLoggedIn } from './../user';

export default function* boot() {
    const isLoggedIn = yield select((state: State) => selectIsLoggedIn(selectUser(state)));
    return yield put(isLoggedIn ? navigateToActiveOrders() : navigateToSignIn());
};