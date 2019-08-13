import numberFieldWithMinValue from  '../../../../connect/formField/numberFieldWithMinValue';
import form, { countMin } from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';
import { ComponentType } from 'react';

type InfoX = {
    formField: 'panelsCountX',
    axis: 'X'
};

type InfoY = {
    formField: 'panelsCountY',
    axis: 'Y'
};

function panelsCountAxisField({ formField, axis }: InfoX | InfoY): ComponentType<{}> {
    return numberFieldWithMinValue({
        form,
        fieldKey: formField,
        extractFormState: selectStencilForm,
        minValue: countMin,
        label: language => language.forms.stencilForm.panelsCountAxis(axis)
    });
}

const PanelsCountXField = panelsCountAxisField({
    formField: 'panelsCountX',
    axis: 'X'
});

const PanelsCountYField = panelsCountAxisField({
    formField: 'panelsCountY',
    axis: 'Y'
});

export { PanelsCountXField, PanelsCountYField };