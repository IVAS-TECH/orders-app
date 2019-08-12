import panelTitle from '../../connect/layout/PanelTitle';
import Language from '../../../../store/language/Language';
import { ComponentType } from 'react';

export default function makePanelTitle(title: keyof Language['forms']['stencilForm']['panelTitle']): ComponentType<{}> {
    return panelTitle(
        language => language.forms.stencilForm.panelTitle[title]
    );
};