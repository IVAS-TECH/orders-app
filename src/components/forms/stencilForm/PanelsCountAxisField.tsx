import field from  './../connect/NumberFieldWithMinValue';
import form from './../../../store/stencilForm';
import { selectStencilForm } from './../../../store/reducer';
import { ComponentType } from 'react';

type InfoX = {
    formField: 'panelsCountX',
    axis: 'X'
};

type InfoY = {
    formField: 'panelsCountY',
    axis: 'Y'
};

function PanelsCountAxisField({ formField, axis }: InfoX | InfoY): ComponentType<{}> {
    return field({
        form,
        fieldKey: formField,
        extractFormState: selectStencilForm,
        minValue: 1,
        label: language => language.forms.stencilForm.panelsCountAxis(axis)
    });
}

const PanelsCountXField = PanelsCountAxisField({
    formField: 'panelsCountX',
    axis: 'X'
});

const PanelsCountYField = PanelsCountAxisField({
    formField: 'panelsCountY',
    axis: 'Y'
});

export { PanelsCountXField, PanelsCountYField };