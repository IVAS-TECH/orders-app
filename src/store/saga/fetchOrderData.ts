import { takeEvery, call, put, all, delay, select } from 'redux-saga/effects';
import { FETCH_ORDER_DATA, FetchOrderData } from './../action';
import { State, selectUser } from './../reducer';
import { selectAuthToken } from './../user';
import { viewOrder } from './../viewOrder';
import request from './../../logic/request';
import { showRequestFor, hideRequestFor } from '../showRequestFor';
import { showAccessDenied }  from '../showAccessDenied';
import { showErrorMessage } from './../showErrorMessage';
import { requestErrorToErrorMessage } from './../../type/RequestError';

function url(id: string) {
    return `/api/order/${id}`;
}

function* handleFetchOrderData({ id }: FetchOrderData) {
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
            const orderData = { ...order, file: { url: `/api/file/${order.fileID}/${order.fileName}` } };
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