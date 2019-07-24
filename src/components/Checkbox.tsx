import React from 'react';
import MUICheckbox from '@material-ui/core/Checkbox';

export interface CheckboxProps {
    checked: boolean,
    onToggle: () => void
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onToggle
}) => (
    <MUICheckbox
        checked={checked}
        color="primary"
        onChange={event => {
            event.preventDefault();
            onToggle();
        }}
    />
);

export default Checkbox;