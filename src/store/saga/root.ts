import { fork } from 'redux-saga/effects'
import languageSaga from './language';

export default function* rootSaga() {
    yield fork(languageSaga);
};