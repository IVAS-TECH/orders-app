import { takeEvery, call } from 'redux-saga/effects';
import Language from './../../type/Language';
import { SET_LANGUAGE, SetLanguageAction } from './../language';
import localForage from 'localforage';

function persistLanguage(language: Language): Promise<Language> {
    return localForage.setItem('language', language);
}

function* handleSetLanguage({ language }: SetLanguageAction) {
    try {
        yield call(persistLanguage, language);
    } catch(error) {
        console.log('[localforage] setItem: language');
        console.log(error);
    }
}

export default function* languageSaga() {
    yield takeEvery(SET_LANGUAGE, handleSetLanguage);
};