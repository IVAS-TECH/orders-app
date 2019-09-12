import { takeEvery, call, put, all, delay, select } from 'redux-saga/effects';
import { SET_CURRENT_ORDER_FILTER,  selectQueryFilter } from './../orderFilter/orderFilter';
import { State, selectUser, selectCurrentOrderFilter } from './../reducer';
import { selectAuthToken } from './../user';
import request from './../../logic/request';
import { pageSize, loadFromInitialOrderFilterQuery } from '../filteredOrders';
import { showRequestFor, hideRequestFor } from '../showRequestFor';
import { showAccessDenied }  from '../showAccessDenied';
import { showErrorMessage } from './../showErrorMessage';
import { requestErrorToErrorMessage } from './../../type/RequestError';
import { QueryFilter } from './../../type/OrderFilter';
import formServerOrderInfoToClient from './../../logic/formServerOrderInfoToClient';

const url = `/api/order/query/${pageSize}`;

function selectOrderQueryFilter(state: State): QueryFilter {
    const currentOrderFilter = selectCurrentOrderFilter(state)!;
    return selectQueryFilter(currentOrderFilter);
}

function* handleSetCurrentOrderFilter() {
    const authToken = yield select((state: State) => selectAuthToken(selectUser(state)));
    const orderFilterQuery = yield select(selectOrderQueryFilter);
    yield put(showRequestFor('searchOrders'));
    try {
        const [ response ] = yield all([
            call(request, {
                url,
                method: 'POST',
                data: orderFilterQuery,
                token: authToken
            }),
            delay(3 * 1000)
        ]);
        const { count, orders, error } = response;
        yield put(hideRequestFor());
        if(orders) {
            yield put(loadFromInitialOrderFilterQuery(count, orders.map(formServerOrderInfoToClient)));
        } else {
            const errorToHandle = error ? error : { badResponse: true };
            if(errorToHandle.accessDenied) {
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

export default function* makeInitialOrderFilterQuerySaga() {
    yield takeEvery(SET_CURRENT_ORDER_FILTER, handleSetCurrentOrderFilter);
};