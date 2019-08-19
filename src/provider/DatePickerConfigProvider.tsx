import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateUtils from '@date-io/date-fns';
import { Locale } from 'date-fns';
import enLocale from 'date-fns/locale/en-GB';
//import bgLocale from 'date-fns/locale/bg';
import { connect } from 'react-redux';
import { State, selectLanguageValue } from './../store/reducer';
import { LangMap } from './../store/language/reducer';
import { configure } from './../component/utils'

const localeMap: LangMap<Locale> = {
    bg: enLocale,
    en: enLocale
};

const MuiPickersUtilsProviderWithSetUtils = configure(
    MuiPickersUtilsProvider,
    { utils: DateUtils }
);

const DatePickerConigProvider = connect(
    (state: State) => ({ locale: localeMap[selectLanguageValue(state)] })
)(MuiPickersUtilsProviderWithSetUtils);

export default DatePickerConigProvider;