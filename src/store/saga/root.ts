import { fork, call } from 'redux-saga/effects'
import boot from './boot';
import languageSaga from './language';
import signInSaga from './signIn';
import signOutSaga from './signOut';

export default function* rootSaga() {
    yield call(boot);
    yield fork(languageSaga);
    yield fork(signInSaga);
    yield fork(signOutSaga);
};