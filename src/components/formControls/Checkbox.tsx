import React from 'react';
import MUICheckbox from '@material-ui/core/Checkbox';

export interface CheckboxProps {
    checked: boolean,
    onToggle: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onToggle
}) => (
    <MUICheckbox
        checked={checked}
        color="primary"
        onChange={_ => onToggle(!checked)}
    />
);

export default Checkbox;