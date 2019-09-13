import { takeEvery } from 'redux-saga/effects';
import { FETCH_ORDER_DATA } from './../action';
import { viewOrder } from './../viewOrder';
import handleOrderData from './handleOrderData';

export default function* fetchOrderDataSaga() {
    yield takeEvery(FETCH_ORDER_DATA, handleOrderData(viewOrder));
};