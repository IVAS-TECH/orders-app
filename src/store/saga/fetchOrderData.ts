import { takeEvery, call, put, all, delay, select } from 'redux-saga/effects';
import ServerFile from './../../type/ServerFile';
import { FETCH_ORDER_DATA, FetchOrderData } from './../action';
import { State, selectOrderDataCache, selectUser } from './../reducer';
import { selectAuthToken } from './../user';
import { viewOrder } from './../viewOrder';
import { cacheOrderData } from './../orderDataCache';
import request from './../../logic/request';
import { showRequestFor, hideRequestFor } from '../showRequestFor';
import { showAccessDenied }  from '../showAccessDenied';
import { showErrorMessage } from './../showErrorMessage';
import { requestErrorToErrorMessage } from './../../type/RequestError';

function url(id: string) {
    return `/api/order/${id}`;
}

function* handleFetchOrderData({ id }: FetchOrderData) {
    const orderDataCache = yield select(selectOrderDataCache);
    if(orderDataCache[id]) {
        yield put(viewOrder(orderDataCache[id]));
        return;
    }
    const authToken = yield select((state: State) => selectAuthToken(selectUser(state)));
    yield put(showRequestFor('orderData'));
    try {
        const [ response ] = yield all([
            call(request, {
                url: url(id),
                method: 'GET',
                token: authToken
            }),
            delay(2 * 1000)
        ]);
        const { order, error } = response;
        yield put(hideRequestFor());
        if(order) {
            const orderData = { ...order, file: new ServerFile(order.fileName, order.fileID) };
            yield put(cacheOrderData(id, orderData));
            yield put(viewOrder(orderData));
        } else {
            const errorToHandle = error ? error : { badResponse: true };
            if(error.accessDenied) {
                yield put(showAccessDenied());
            } else {
                yield put(showErrorMessage(requestErrorToErrorMessage(errorToHandle)));
            }
        }
    } catch(error) {
        yield put(hideRequestFor());
        yield put(showErrorMessage('networkError'));
    }
}

export default function* fetchOrderDataSaga() {
    yield takeEvery(FETCH_ORDER_DATA, handleFetchOrderData);
};