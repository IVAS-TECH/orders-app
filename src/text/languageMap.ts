import Language from './language/Text';
import { LanguageMap } from './../type/Language';
import bg from './bg/text';
import en from './en/text';

const languageMap: LanguageMap<Language> = {
    'bg': bg,
    'en': en
};

export default languageMap;