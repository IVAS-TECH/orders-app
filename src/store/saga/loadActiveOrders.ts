import { put } from 'redux-saga/effects';
import Action from './../../type/Action';
import { showCouldNotLoadData } from './../showCouldNotLoadData';
import { loadActiveOrders } from './../activeOrders';
import parseISO from 'date-fns/parseISO';

export default function* load(retryAction: Action, response: unknown) {
    if(typeof response !== 'object') {
        yield put(showCouldNotLoadData(retryAction));
        return;
    }
    if(response === null) {
        yield put(showCouldNotLoadData(retryAction));
        return;
    }
    const { activeOrders } = response as { activeOrders?: unknown };
    if(!(activeOrders instanceof Array)) {
        yield put(showCouldNotLoadData(retryAction));
        return;
    }
    const activeOrdersWithDate = activeOrders.map(order => ({...order, date: parseISO(order.date) }))
    yield put(loadActiveOrders(activeOrdersWithDate));
};