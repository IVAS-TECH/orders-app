import React from 'react';
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';

export interface CheckboxProps {
    checked: boolean,
    onToggle: (checked: boolean) => void,
    edge?: MuiCheckboxProps['edge']
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onToggle,
    edge
}) => (
    <MuiCheckbox
        checked={checked}
        color="primary"
        size='medium'
        onChange={_ => onToggle(!checked)}
        edge={edge}
    />
);

export default Checkbox;