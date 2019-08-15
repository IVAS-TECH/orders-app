import React from 'react';
import FormControl, { ControlProps } from './FormControl';
import FilledInput from '@material-ui/core/FilledInput';

export interface InputProps extends ControlProps {
    id: string,
    value: string,
    onValueChange: (value: string) => void
}

export function handleOnChangeEvent(currentValue: string, onValueChange?: (_: string) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;
        if((eventValue !== currentValue) && onValueChange) {
            onValueChange(eventValue);
        }
    }
}

const Input: React.FC<InputProps> = ({
    id,
    value,
    label,
    disabled,
    required,
    error,
    onValueChange
}) => (
    <FormControl
        labelFor={id}
        label={label}
        required={required}
        disabled={disabled}
        error={error}>
        <FilledInput
            id={id}
            value={value}
            onChange={handleOnChangeEvent(value, onValueChange)} />
    </FormControl>
);

export default Input;