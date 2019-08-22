import Select, { SelectProps }  from '../../formControlWithText/Select'; 
import Language from './../../../type/Language';
import { connect } from 'react-redux';
import { configure } from '../../utils';
import { State, selectLanguage } from '../../../store/reducer';
import { setLanguage } from './../../../store/language';

const LanguageSelect: React.FC<SelectProps<Language>> = Select;

const Field = configure(LanguageSelect, {
    id: 'select-language',
    options: ['bg', 'en'],
    label: text => text.language.language,
    optionText: text => text.language.option
});

export default connect(
    (state: State) => ({ value: selectLanguage(state) }),
    { onValueChange: setLanguage }
)(Field);