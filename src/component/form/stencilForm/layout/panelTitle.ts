import { FunctionComponent } from 'react';
import PanelTitle from '../../layout/PanelTitle';
import Text from './../../../../text/language/Text';
import { configure } from '../../../utils';

type Title = keyof Text['stencilForm']['panelTitle'];

export default function panelTitle(title: Title): FunctionComponent<{}> {
    return configure(PanelTitle, {
        title: text => text.stencilForm.panelTitle[title]
    });
};