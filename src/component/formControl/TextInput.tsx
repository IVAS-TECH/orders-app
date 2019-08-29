import React from 'react';
import FormControl, { ControlProps } from './FormControl';
import FilledInput from '@material-ui/core/FilledInput';

export interface TextInputProps extends ControlProps {
    id: string,
    value: string,
    type?: string,
    placeholder?: string,
    autoComplete?: string,
    onValueChange: (value: string) => void,
    onFocus?: () => void,
    onBlur?: () => void
}

export function handleOnChangeEvent(currentValue: string, onValueChange?: (_: string) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;
        if((eventValue !== currentValue) && onValueChange) {
            onValueChange(eventValue);
        }
    }
};

const Input: React.FC<TextInputProps> = ({
    id,
    type,
    value,
    label,
    placeholder,
    autoComplete,
    margin,
    disabled,
    required,
    error,
    onValueChange,
    onFocus,
    onBlur
}) => (
    <FormControl
        labelFor={id}
        label={label}
        margin={margin}
        required={required}
        disabled={disabled}
        error={error}>
        <FilledInput
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={handleOnChangeEvent(value, onValueChange)}
            onFocus={onFocus}
            onBlur={onBlur} />
    </FormControl>
);

export default Input;