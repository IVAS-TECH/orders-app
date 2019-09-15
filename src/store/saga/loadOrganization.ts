import { put } from 'redux-saga/effects';
import Action from './../../type/Action';
import { showCouldNotLoadData } from './../showCouldNotLoadData';
import { loadOrganizationData } from './../organization';
import Organization from '../../type/Organization';

export default function* loadOrganization(retryAction: Action, response: unknown) {
    if(typeof response !== 'object') {
        yield put(showCouldNotLoadData(retryAction));
        return;
    }
    if(response === null) {
        yield put(showCouldNotLoadData(retryAction));
        return;
    }
    const { organization } = response as { organization?: unknown };
    /*if(!isMembers(members)) {
        yield put(showCouldNotLoadData(retryAction));
        return;
    }*/
    yield put(loadOrganizationData(organization as Organization));
};