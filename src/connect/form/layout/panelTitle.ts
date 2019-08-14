import { connect } from 'react-redux';
import { State, selectLanguage } from '../../../store/reducer';
import Language from '../../../store/language/Language';
import { ComponentType } from 'react';
import PanelTitle from '../../../component/form/layout/PanelTitle';

export default function panelTitle(title: (language: Language) => string): ComponentType<{}> {
    return connect((state: State) => ({ title: title(selectLanguage(state)) }))(PanelTitle);
}