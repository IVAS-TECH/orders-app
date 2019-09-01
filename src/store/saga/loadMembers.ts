import { put } from 'redux-saga/effects';
import Action from './../../type/Action';
import { showCouldNotLoadData } from './../showCouldNotLoadData';
import { loadStateFromOrganizationMembers } from './../orderFilter/setOrderFilter/orderedBy';
import isMembers from './../../logic/validate/isMembers';

export default function* loadMembers(retryAction: Action, response: unknown) {
    console.log({ response });
    if(typeof response !== 'object') {
        yield put(showCouldNotLoadData(retryAction));
        return;
    }
    if(response === null) {
        yield put(showCouldNotLoadData(retryAction));
        return;
    }
    const { members } = response as { members?: unknown };
    if(!isMembers(members)) {
        yield put(showCouldNotLoadData(retryAction));
        return;
    }
    yield put(loadStateFromOrganizationMembers(members));
};