import React from 'react';
import FormControl, { ControlProps } from './FormControl';
import FilledInput from '@material-ui/core/FilledInput';

export interface InputProps extends ControlProps {
    id: string,
    value: number | '',
    onValueChange: (value: number | '') => void
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
                if((currentValue === '') || (eventNumberValue !== currentValue)) {
                    onValueChange(eventNumberValue);
                }
            }
        }
    }
}

const NumberInput: React.FC<InputProps> = ({
    id,
    value,
    label,
    disabled,
    required,
    error,
    onValueChange
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
            onChange={handleOnChangeEvent(value, onValueChange)} />
    </FormControl>
);

export default NumberInput;