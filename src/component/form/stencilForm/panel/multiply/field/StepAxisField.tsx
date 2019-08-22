import numberFieldWithMinValue from  '../../../../../../connect/form/formField/numberFieldWithMinValue';
import form, { stepMin } from '../../../../../../store/stencilForm';
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

function stepAxisField({ formField, axis }: InfoX | InfoY): ComponentType<{}> {
    return numberFieldWithMinValue({
        form,
        fieldKey: formField,
        extractFormState: selectStencilForm,
        minValue: stepMin,
        label: text => text.stencilForm.stepAxis(axis)
    });
}

const StepXField = stepAxisField({
    formField: 'stepX',
    axis: 'X'
});

const StepYField = stepAxisField({
    formField: 'stepY',
    axis: 'Y'
});

export { StepXField, StepYField };