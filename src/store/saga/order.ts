import { takeEvery, call, select } from 'redux-saga/effects';
import { MAKE_ORDER, MakeOrder } from '../action';
import { State, selectUser } from './../reducer';
import { selectAuthToken } from './../user';
import order from './../../logic/order';

function selectAuthorizationToken(state: State): string {
    return selectAuthToken(selectUser(state));
}

function* handleMakeOrder({ stencilData }: MakeOrder) {
    try {
        const authToken: string = yield select(selectAuthorizationToken);
        const response = yield call(order, stencilData, authToken);
        console.log({ response });
    } catch(error) {
        console.log({error})
    }
}

export default function* orderSaga() {
    yield takeEvery(MAKE_ORDER, handleMakeOrder);
};