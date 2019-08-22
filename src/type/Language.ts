type Language = 'bg' | 'en';

export type LanguageMap<T> = {
    [L in Language]: T
};

export default Language;