import { takeEvery, call, select, put, all, delay } from 'redux-saga/effects';
import { CREATE_ORGANIZATION } from './../action';
import { navigateToSignIn } from './../location/route';
import { State, selectOrganizationManagerForm } from './../reducer';
import { showRequestFor, hideRequestFor } from './../showRequestFor';
import { showRequestResult } from './../showRequestResult';
import { showErrorMessage } from './../showErrorMessage';
import { requestErrorToErrorMessage } from './../../type/RequestError';
import form, { Fields } from './../organizationManagerForm/form';
import request from './../../logic/request';

type Data = Record<keyof Fields , string>;

function selectData(state: State): Data {
    return form.selectors.form.values(selectOrganizationManagerForm(state)) as Data;
}

const url = '/api/user/organizationManager';

function* handleCreateOrganization() {
    const data = yield select(selectData);
    yield put(showRequestFor('createOrganization'));
    try {
        const [ response ] = yield all([
            call(request, {
                url,
                method: 'POST',
                data
            }),
            delay(3 * 1000)
        ]);
        const { result, error } = response;
        yield put(hideRequestFor());
        if(result === 'createdOrganizationManager') {
            yield put(navigateToSignIn());
            yield put(showRequestResult({ result: 'createdOrganizationManager', data: data.email }));
        } else {
            const errorToHandle = error ? error : { badResponse: true };
            yield put(showErrorMessage(requestErrorToErrorMessage(errorToHandle)));
        }
    } catch(error) {
        yield put(hideRequestFor());
        yield put(showErrorMessage('networkError'));
    }
}

export default function* createOrganizationSaga() {
    yield takeEvery(CREATE_ORGANIZATION, handleCreateOrganization);
};