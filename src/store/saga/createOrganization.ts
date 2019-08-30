import { takeEvery, call, select, put } from 'redux-saga/effects';
import { CREATE_ORGANIZATION } from './../action';
import { navigateToSignIn } from './../location/route';
import { State, selectOrganizationManagerForm } from './../reducer';
import form, { Fields } from './../organizationManagerForm/form';
import request from './../../logic/request';

type Data = Record<keyof Fields , string>;

function selectData(state: State): Data {
    return form.selectors.form.values(selectOrganizationManagerForm(state)) as Data;
}

const url = '/api/user/organizationManager';

function* handleCreateOrganization() {
    const data = yield select(selectData);
    try {
        const { result, error } = yield call(request, {
            url,
            method: 'POST',
            data
        });
        if(result === 'createdOrganizationManager') {
            yield put(navigateToSignIn());
        } else {
            const errorToHandle = error ? error : { badResponse: true };
            // HANDLE ERROR !!!
            console.log(errorToHandle);
        }
    } catch(error) {
        console.log(`[fetch] ${url}`);
        console.log(error);
    }
}

export default function* createOrganizationSaga() {
    yield takeEvery(CREATE_ORGANIZATION, handleCreateOrganization);
};