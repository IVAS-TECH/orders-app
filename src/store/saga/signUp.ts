import { takeEvery, call, select, put, all, delay } from 'redux-saga/effects';
import { SIGN_UP } from './../action';
import { navigateToSignIn } from './../location/route';
import { State, selectRegisterForm, selectLocation } from './../reducer';
import { showRequestFor, hideRequestFor } from './../showRequestFor';
import { showRequestResult } from './../showRequestResult';
import { showErrorMessage } from './../showErrorMessage';
import { requestErrorToErrorMessage } from './../../type/RequestError';
import form, { Fields } from './../registerForm/form';
import request from './../../logic/request';

type Data = Record<keyof Fields , string>;

function selectData(state: State): Data {
    return form.selectors.form.values(selectRegisterForm(state)) as Data;
}

function url(organizationToken: string): string {
    return `/api/user/register/${organizationToken}`;
}

function* handleSignUp() {
    const { payload } = yield select(selectLocation);
    const data = yield select(selectData);
    yield put(showRequestFor('signUp'));
    try {
        const [ response ] = yield all([
            call(request, {
                url: url(payload.organzation),
                method: 'POST',
                data
            }),
            delay(3 * 1000)
        ]);
        const { result, error } = response;
        if(result === 'registeredUser') {
            yield put(hideRequestFor());
            yield put(navigateToSignIn());
            yield put(showRequestResult({ result: 'registeredUser', data: data.email }));
        } else {
            const errorToHandle = error ? error : { badResponse: true };
            yield put(hideRequestFor());
            yield put(showErrorMessage(requestErrorToErrorMessage(errorToHandle)));
        }
    } catch(error) {
        yield put(hideRequestFor());
        yield put(showErrorMessage('networkError'));
    }
}

export default function* signUpSaga() {
    yield takeEvery(SIGN_UP, handleSignUp);
};