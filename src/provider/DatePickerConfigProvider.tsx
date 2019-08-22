import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateUtils from '@date-io/date-fns';
import { Locale } from 'date-fns';
import enLocale from 'date-fns/locale/en-GB';
//import bgLocale from 'date-fns/locale/bg';
import { connect } from 'react-redux';
import { State, selectLanguage } from './../store/reducer';
import { LanguageMap } from './../type/Language';
import { configure } from './../component/utils'

const localeMap: LanguageMap<Locale> = {
    bg: enLocale,
    en: enLocale
};

const MuiPickersUtilsProviderWithSetUtils = configure(
    MuiPickersUtilsProvider,
    { utils: DateUtils }
);

const DatePickerConigProvider = connect(
    (state: State) => ({ locale: localeMap[selectLanguage(state)] })
)(MuiPickersUtilsProviderWithSetUtils);

export default DatePickerConigProvider;