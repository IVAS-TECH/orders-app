import { select, put } from 'redux-saga/effects';
import { selectLocation } from './../reducer';
import { ROUTE_SIGN_UP } from './../location/route';
import registerForm from './../registerForm/form';

export default function* boot() {
    const { type, payload } = yield select(selectLocation);
    if(type === ROUTE_SIGN_UP) {
        const { email, phone, userName } = registerForm.actions.setValue;
        yield put(email(payload.email));
        yield put(phone(payload.phone));
        if(payload.name) {
            yield put(userName(payload.name));
        }
    }
};