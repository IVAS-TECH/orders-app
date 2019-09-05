import { takeEvery, call, select, put, all, delay } from 'redux-saga/effects';
import { MAKE_ORDER, MakeOrder } from '../action';
import { State, selectUser } from './../reducer';
import { showRequestFor, hideRequestFor } from './../showRequestFor';
import { selectAuthToken } from './../user';
import { showRequestResult } from './../showRequestResult';
import { createdOrder as createdOrderAction } from './../stencilForm';
import { showErrorMessage } from './../showErrorMessage';
import { requestErrorToErrorMessage } from './../../type/RequestError';
import order from './../../logic/order';

function selectAuthorizationToken(state: State): string {
    return selectAuthToken(selectUser(state));
}

function* handleMakeOrder({ orderData }: MakeOrder) {
    const authToken: string = yield select(selectAuthorizationToken);
    yield put(showRequestFor('makeOrder'));
    try {
        const [ response ] = yield all([
            call(order, orderData, authToken),
            delay(3 * 1000)
        ]);
        const { createdOrder, error } = response;
        yield put(hideRequestFor());
        if(createdOrder) {
            yield put(createdOrderAction());
            yield put(showRequestResult({ result: 'createdOrder', data: createdOrder }));
        } else {
            const errorToHandle = error ? error : { badResponse: true };
            yield put(showErrorMessage(requestErrorToErrorMessage(errorToHandle)));
        }
    } catch(error) {
        yield put(hideRequestFor());
        yield put(showErrorMessage('networkError'));
    }
}

export default function* orderSaga() {
    yield takeEvery(MAKE_ORDER, handleMakeOrder);
};