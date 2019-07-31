import React from 'react';
import FormControl, { ControlProps } from './FormControl';
import FilledInput from '@material-ui/core/FilledInput';

export interface InputProps extends ControlProps {
    id: string,
    value: number | '',
    onValueChange: (value: number | '') => void,
    integer?: boolean
}

function handleOnChangeEvent(
    currentValue: number | '',
    onValueChange: (_: number | '') => void
) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value: eventValue } = event.target;
        if(eventValue === '') {
            if(currentValue !== '') {
                onValueChange('');
            }
        } else {
            const eventNumberValue = Number(eventValue);
            if(!Number.isNaN(eventNumberValue)) {
                if(eventNumberValue !== currentValue) {
                    onValueChange(eventNumberValue);
                }
            }
        }
    }
}

function handleOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if(event.key === '.') {
        event.stopPropagation();
        event.preventDefault();
    }
}

const NumberInput: React.FC<InputProps> = ({
    id,
    value,
    label,
    disabled,
    required,
    error,
    onValueChange,
    integer
}) => (
    <FormControl
        shrinkLabel={value !== ''}
        labelFor={id}
        label={label}
        required={required}
        disabled={disabled}
        error={error}>
        <FilledInput
            id={id}
            type='number'
            value={value}
            onChange={handleOnChangeEvent(value, onValueChange)}
            onKeyDown={integer ? handleOnKeyDown : undefined} />
    </FormControl>
);

export default NumberInput;