import React from 'react';
import FormControl, { ControlProps } from './FormControl';
import FilledInput from '@material-ui/core/FilledInput';

export interface TextInputProps extends ControlProps {
    id: string,
    value: string,
    placeholder?: string,
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

const Input: React.FC<TextInputProps> = ({
    id,
    value,
    label,
    placeholder,
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
            placeholder={placeholder}
            onChange={handleOnChangeEvent(value, onValueChange)} />
    </FormControl>
);

export default Input;