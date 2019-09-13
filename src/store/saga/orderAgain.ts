import { takeEvery } from 'redux-saga/effects';
import { ORDER_AGAIN } from './../action';
import handleOrderData from './handleOrderData';
import convertFromOrderDataToStencilFormValues from './../../logic/convertFromOrderDataToStencilFormValues';
import stencilForm from './../stencilForm';
import { OrderData } from '../../type/OrderData';

function action(orderData: OrderData) {
    const values = convertFromOrderDataToStencilFormValues(orderData);
    return stencilForm.actions.setValues(values);
}

export default function* orderAgainSaga() {
    yield takeEvery(ORDER_AGAIN, handleOrderData(action));
};