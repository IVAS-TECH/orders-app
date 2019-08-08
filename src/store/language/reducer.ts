import Language from './Language';
import bg from './bg';
import en from './en';

export const SET_LANGUAGE = 'ivas-tech/orders-app/language/SET_LANGUAGE';

export type Lang = 'bg' | 'en';

export interface SetLanguageAction {
    type: typeof SET_LANGUAGE,
    language: Lang
};

const language = {
    bg,
    en
};

export function setLanguage(lang: Lang): SetLanguageAction {
    return {
        type: SET_LANGUAGE,
        language: lang
    }
}

export function reducer(state: Lang = 'bg', action: SetLanguageAction | { type: string }): Lang {
    if(action.type === SET_LANGUAGE) {
        return (action as SetLanguageAction).language;
    } else {
        return state;
    }
}

export function selector(lang: Lang): Language {
    return language[lang];
}