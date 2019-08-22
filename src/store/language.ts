import Language from './../type/Language';
import { createReducer } from './utils';

export const SET_LANGUAGE = 'ivas-tech/orders-app/language/SET_LANGUAGE';

export interface SetLanguageAction {
    type: typeof SET_LANGUAGE,
    language: Language
};

export function setLanguage(language: Language): SetLanguageAction {
    return {
        type: SET_LANGUAGE,
        language
    }
};

const reducer = createReducer('bg' as Language, {
    [SET_LANGUAGE]: (
        _state: Language,
        { language }: SetLanguageAction
    ) => language
})

export default reducer;