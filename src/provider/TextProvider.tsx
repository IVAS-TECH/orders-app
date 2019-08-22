
import { connect } from 'react-redux';
import { State, selectLanguage } from './../store/reducer';
import TextContext from './../text/TextContext';
import languageMap from './../text/languageMap';

const TextProvider = connect(
    (state: State) => ({ value: languageMap[selectLanguage(state)] })
)(TextContext.Provider);

export default TextProvider;