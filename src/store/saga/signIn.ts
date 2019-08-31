import { takeEvery, call, select, put, all, delay } from 'redux-saga/effects';
import User from './../../type/User';
import { SIGN_IN } from './../action';
import { login } from './../user';
import { navigateToActiveOrders } from './../location/route';
import { showRequestFor, hideRequestFor } from './../showRequestFor';
import { showErrorMessage } from './../showErrorMessage';
import { requestErrorToErrorMessage } from './../../type/RequestError';
import { State, selectLoginForm } from './../reducer';
import loginForm from './../loginForm/form';
import request from './../../logic/request';
import isUser from './../../logic/validate/isUser';
import localForage from 'localforage';

type Data = { email: string, password: string, rememberMe: boolean };

function persistUser(user: User): Promise<User> {
    return localForage.setItem('user', user);
}

function selectData(state: State): Data {
    return loginForm.selectors.form.values(selectLoginForm(state)) as Data;
}

const url = '/api/user/login';

function* handleSignIn() {
    const { email, password, remember } = yield select(selectData);
    yield put(showRequestFor('signIn'));
    try {
        const [ response ] = yield all([
            call(request, {
                url,
                method: 'POST',
                data: { email, password }
            }),
            delay(2 * 1000)
        ]);
        const { token, userName, error } = response;
        const user = {
            authToken: token,
            name: userName
        };
        if(isUser(user)) {
            if(remember) {
                try {
                    yield call(persistUser, user);
                } catch(error) {
                    console.log('[localforage] setItem: user');
                    console.log(error);
                }
            }
            yield put(hideRequestFor());
            yield put(login(user));
            yield put(navigateToActiveOrders());
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

export default function* singInSaga() {
    yield takeEvery(SIGN_IN, handleSignIn);
};