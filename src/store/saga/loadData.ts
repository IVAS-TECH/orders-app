import { takeEvery, call, put, all, delay, select } from 'redux-saga/effects';
import Action from './../../type/Action';
import {
    //ROUTE_ACTIVE_ORDERS,
    ROUTE_ORDER_HISTORY
} from './../location/route';
import { State, selectLocation, selectUser } from './../reducer';
import { selectAuthToken } from './../user';
import request from './../../logic/request';
import { showRequestFor, hideRequestFor } from '../showRequestFor';
import { showAccessDenied }  from '../showAccessDenied';
import { showCouldNotLoadData } from '../showCouldNotLoadData';
import RequestFor from '../../type/RequestFor';
import loadMembers from './loadMembers';

interface LoadInfo {
    url: string,
    loadData: RequestFor,
    continuation: (retryAction: Action, response: unknown) => IterableIterator<unknown>
}

const loadDataFor: Record<string, LoadInfo> = {
    [ROUTE_ORDER_HISTORY]: {
        url: '/api/organization/members',
        loadData: 'organizationMembers',
        continuation: loadMembers
    }
};

type LoadAction = { type: keyof typeof loadDataFor };

function selectAuthorizationToken(state: State): string {
    return selectAuthToken(selectUser(state));
}

function* handleLoadData(action: LoadAction) {
    const route = action.type;
    const { url, loadData, continuation } = loadDataFor[route];
    const authToken = yield select(selectAuthorizationToken);
    yield put(showRequestFor(loadData));
    try {
        const [ response ] = yield all([
            call(request, {
                url,
                method: 'GET',
                token: authToken
            }),
            delay(3 * 1000)
        ]);
        yield put(hideRequestFor());
        if(response.error) {
            if(response.error.accessDenied) {
                yield put(showAccessDenied());
            } else {
                yield put(showCouldNotLoadData(action));
            }
            return;
        }
        yield call(continuation, action, response);
    } catch(error) {
        yield put(hideRequestFor());
        yield put(showCouldNotLoadData(action));
    }
}

export default function* loadDataSaga() {
    const loadDataForRoutes = Object.keys(loadDataFor);
    const action = yield select(selectLocation);
    if(loadDataForRoutes.includes(action.type)) {
        yield call(handleLoadData, action);
    }
    yield takeEvery(loadDataForRoutes, handleLoadData);
};