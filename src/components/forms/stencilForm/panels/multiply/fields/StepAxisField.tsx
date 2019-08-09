import field from  '../../../../connect/formField/NumberFieldWithMinValue';
import form from '../../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../../store/reducer';
import { ComponentType } from 'react';

type InfoX = {
    formField: 'stepX',
    axis: 'X'
};

type InfoY = {
    formField: 'stepY',
    axis: 'Y'
};

function StepAxisField({ formField, axis }: InfoX | InfoY): ComponentType<{}> {
    return field({
        form,
        fieldKey: formField,
        extractFormState: selectStencilForm,
        minValue: 0,
        label: language => language.forms.stencilForm.stepAxis(axis)
    });
}

const StepXField = StepAxisField({
    formField: 'stepX',
    axis: 'X'
});

const StepYField = StepAxisField({
    formField: 'stepY',
    axis: 'Y'
});

export { StepXField, StepYField };