import { fork, call } from 'redux-saga/effects'
import languageSaga from './language';
import boot from './boot';

export default function* rootSaga() {
    yield call(boot);
    yield fork(languageSaga);
};