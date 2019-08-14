import panelTitle from '../../../../connect/form/layout/panelTitle';
import Language from '../../../../store/language/Language';
import { ComponentType } from 'react';

export default function panelTitleWrapper(title: keyof Language['forms']['stencilForm']['panelTitle']): ComponentType<{}> {
    return panelTitle(
        language => language.forms.stencilForm.panelTitle[title]
    );
};