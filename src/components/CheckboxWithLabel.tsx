import React from 'react';
import Checkbox, { CheckboxProps } from './Checkbox';
import FormControlLabel, { FormControlLabelProps } from '@material-ui/core/FormControlLabel';

export interface CheckboxWithLabelProps extends CheckboxProps {
    label: string,
    labelPlacement?: FormControlLabelProps['labelPlacement']
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
    label,
    labelPlacement,
    ...checkboxProps
}) => (
    <FormControlLabel
        label={label}
        labelPlacement={labelPlacement}
        control={<Checkbox {...checkboxProps} />}
    />
);

export default CheckboxWithLabel;