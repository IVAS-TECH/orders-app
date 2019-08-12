import Select, { SelectProps }  from '../../formControl/Select'; 
import { connect } from 'react-redux';
import { configure } from '../../utils';
import { Lang, setLanguage } from '../../../store/language/reducer';
import { State, selectLanguageValue, selectLanguage } from '../../../store/reducer';

const LanguageSelect: React.FC<SelectProps<Lang>> = Select;

const Field = configure(LanguageSelect, {
    id: 'select-language'
});

export default connect(
    (state: State) => {
        const { language, bg, en } = selectLanguage(state).language;
        return {
            value: selectLanguageValue(state),
            label: language,
            options: [{
                    value: 'bg' as 'bg',
                    text: bg
                }, {
                    value: 'en' as 'en',
                    text: en
                }]
        }
    }, { onValueChange: setLanguage }
)(Field);