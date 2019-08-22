import React from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl, { ControlProps } from './FormControl';
import MuiSelect from '@material-ui/core/Select';

export type OptionText<Value extends string | number> = {
    [V in Value]: string
};

export interface SelectProps<Value extends string | number> extends ControlProps {
    id: string,
    value: Value | '',
    onValueChange: (value: Value) => void,
    notSelectedText?: string,
    options: Array<Value>,
    optionText: OptionText<Value>
};

type ChangeEvent = React.ChangeEvent<{name?: string; value: unknown}>;

function handleOnChangeEvent<Value extends string | number>(currentValue: Value | '', onValueChange: (_: Value) => void) {
    return (event: ChangeEvent) => {
        const eventValue = event.target.value as Value | '';
        if(eventValue !== '' && currentValue !== eventValue) {
            onValueChange(eventValue);
        }
    };
}

export default function Select<Value extends string | number>(props: SelectProps<Value>) {
    const {
        id,
        label,
        disabled,
        required,
        error,
        value,
        onValueChange,
        notSelectedText,
        options,
        optionText
    } = props;
    return (
        <FormControl
            labelFor={id}
            label={label}
            required={required}
            disabled={disabled}
            error={error}>
            <MuiSelect
                value={value}
                onChange={handleOnChangeEvent(value, onValueChange)}
                input={<FilledInput id={id} />}>
                {(notSelectedText && value === '') &&
                    <MenuItem value=''>
                        {notSelectedText}
                    </MenuItem>}
                {options.map(value => (
                    <MenuItem value={value} key={value}>
                        {optionText[value]}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};