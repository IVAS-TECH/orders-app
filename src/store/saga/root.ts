import { fork, call } from 'redux-saga/effects'
import boot from './boot';
import languageSaga from './language';
import signInSaga from './signIn';
import signOutSaga from './signOut';
import createOrganizationSaga from './createOrganization';
import signUpSaga from './signUp';
import loadDataSaga from './loadData';
import orderSaga from './order';
import fetchOrderSaga from './fetchOrderData';
import makeInitialOrderFilterQuerySaga from './makeInitialOrderFilterQuery';
import orderAgainSaga from './orderAgain';
import inviteToOrganizationSaga from './inviteToOrganization';

export default function* rootSaga() {
    yield call(boot);
    yield fork(languageSaga);
    yield fork(signInSaga);
    yield fork(signOutSaga);
    yield fork(createOrganizationSaga);
    yield fork(signUpSaga);
    yield fork(loadDataSaga);
    yield fork(orderSaga);
    yield fork(fetchOrderSaga);
    yield fork(makeInitialOrderFilterQuerySaga);
    yield fork(orderAgainSaga);
    yield fork(inviteToOrganizationSaga);
};