import React from 'react';
import Checkbox, {CheckboxProps} from './Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export interface CheckboxWithLabelProps extends CheckboxProps {
    label: string
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({label, ...rest}) => (
    <FormControlLabel
        label={label}
        control={<Checkbox {...rest} />}
    />
);

export default CheckboxWithLabel;