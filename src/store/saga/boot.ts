import { select, put } from 'redux-saga/effects';
import { selectLocation } from './../reducer';
import { ROUTE_SIGN_UP } from './../location/route';
import registerForm from './../registerForm/form';

export default function* boot() {
    const { type, payload } = yield select(selectLocation);
    if(type === ROUTE_SIGN_UP) {
        if(payload.email) {
            yield put(registerForm.actions.setValue.email(payload.email));
        }
    }
};