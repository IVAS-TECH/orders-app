import { takeEvery, call, select, put } from 'redux-saga/effects';
import User from './../../type/User';
import { SIGN_IN } from './../action';
import { login } from './../user';
import { navigateToActiveOrders } from './../location/route';
import { State, selectLoginForm } from './../reducer';
import loginForm from './../loginForm/form';
import request from './../../logic/request';
import localForage from 'localforage';

type Data = { email: string, password: string, rememberMe: boolean };

function persistUser(user: User): Promise<User> {
    return localForage.setItem('user', user);
}

function selectData(state: State): Data {
    return loginForm.selectors.form.values(selectLoginForm(state)) as Data;
}

function* handleSignIn() {
    const { email, password, remember } = yield select(selectData);
    try {
        const { token, userName, error } = yield call(request, {
            url: '/api/user/login',
            method: 'POST',
            data: { email, password }
        });
        if(error) {
            // HANDLE ERROR !!!
            console.log(error);
        } else {
            const user: User = {
                authToken: token,
                name: userName
            };
            if(remember) {
                try {
                    yield call(persistUser, user);
                } catch(error) {
                    console.log('[localforage] setItem: user');
                    console.log(error);
                }
            }
            yield put(login(user));
            yield put(navigateToActiveOrders());
        }
    } catch(error) {
        console.log('[fetch] /api/user/login');
        console.log(error);
    }
}

export default function* singInSaga() {
    yield takeEvery(SIGN_IN, handleSignIn);
};