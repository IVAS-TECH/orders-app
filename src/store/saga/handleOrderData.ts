import { call, put, all, delay, select } from 'redux-saga/effects';
import ServerFile from '../../type/ServerFile';
import { State, selectOrderDataCache, selectUser } from '../reducer';
import { selectAuthToken } from '../user';
import { cacheOrderData } from '../orderDataCache';
import request from '../../logic/request';
import { showRequestFor, hideRequestFor } from '../showRequestFor';
import { showAccessDenied }  from '../showAccessDenied';
import { showErrorMessage } from '../showErrorMessage';
import { requestErrorToErrorMessage } from '../../type/RequestError';
import { OrderData } from '../../type/OrderData';
import Action from '../../type/Action';

function url(id: string) {
    return `/api/order/${id}`;
}

function handleOrderData(action: (orderData: OrderData) => Action) {
    return function* handle({ id }: { type: string, id: string }) {
        const orderDataCache = yield select(selectOrderDataCache);
        if(orderDataCache[id]) {
            yield put(action(orderDataCache[id]));
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
                yield put(action(orderData));
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
    };
}

export default handleOrderData;