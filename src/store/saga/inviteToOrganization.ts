import { takeEvery, call, select, put, all, delay } from 'redux-saga/effects';
import { INVITE_TO_ORGANIZATION } from './../action';
import { State, selectInviteUserForm, selectUser } from './../reducer';
import { showRequestFor, hideRequestFor } from './../showRequestFor';
import { showRequestResult } from './../showRequestResult';
import { showErrorMessage } from './../showErrorMessage';
import { requestErrorToErrorMessage } from './../../type/RequestError';
import form, { Fields } from './../inviteToOrganization/inviteUserForm';
import request from './../../logic/request';
import { selectAuthToken } from '../user';

type UserData = Record<keyof Fields , string>;

function selectUserData(state: State): UserData {
    return form.selectors.form.values(selectInviteUserForm(state)) as UserData;
}

function selectAuthorizationToken(state: State): string {
    return selectAuthToken(selectUser(state));
}

const url = '/api/organization/invite';

function* handleInviteToOrganization() {
    const authToken = yield select(selectAuthorizationToken);
    yield put(showRequestFor('inviteToOrganization'));
    try {
        const [ response ] = yield all([
            call(request, {
                url,
                method: 'GET',
                token: authToken
            }),
            delay(2 * 1000)
        ]);
        const { organization, error } = response;
        yield put(hideRequestFor());
        if(organization) {
            const { email, phone, userName }: UserData = yield select(selectUserData);
            const baseLink = `${window.location.origin}/signUp/${organization}/${email}/${phone}`;
            const link = userName === '' ? baseLink : `${baseLink}/${userName}`;
            yield put(showRequestResult({ result: 'inviteUser', data: link }));
        } else {
            const errorToHandle = error ? error : { badResponse: true };
            yield put(showErrorMessage(requestErrorToErrorMessage(errorToHandle)));
        }
    } catch(error) {
        yield put(hideRequestFor());
        yield put(showErrorMessage('networkError'));
    }
}

export default function* inviteToOrganizationSaga() {
    yield takeEvery(INVITE_TO_ORGANIZATION, handleInviteToOrganization);
};