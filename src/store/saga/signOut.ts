import { takeEvery, call, put } from 'redux-saga/effects';
import { LOGOUT } from './../user';
import { navigateToSignIn } from './../location/route';
import localForage from 'localforage';

function removeUser(): Promise<void> {
    return localForage.removeItem('user');
}

function* handleLogOut() {
    try {
        yield call(removeUser);
    } catch(error) {
        console.log('[localforage] removeItem: user');
        console.log(error);
    }
    yield put(navigateToSignIn());
}

export default function* signOutSaga() {
    yield takeEvery(LOGOUT, handleLogOut);
};