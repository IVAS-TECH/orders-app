import React from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl, { ControlProps } from './FormControl';
import MUISelect from '@material-ui/core/Select';

export interface Option<Value extends string | number>{
    value: Value,
    text: string
};

export interface SelectProps<Value extends string | number> extends ControlProps {
    id: string,
    value: Value | '',
    onValueChange: (value: Value) => void,
    notSelectedText?: string,
    options: Array<Option<Value>>
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
        options
    } = props;
    return (
        <FormControl
            labelFor={id}
            label={label}
            required={required}
            disabled={disabled}
            error={error}>
            <MUISelect
                value={value}
                onChange={handleOnChangeEvent(value, onValueChange)}
                input={<FilledInput id={id} />}>
                {(notSelectedText && value === '') &&
                    <MenuItem value=''>
                        {notSelectedText}
                    </MenuItem>}
                {options.map(({value, text}) =>
                    <MenuItem value={value} key={value}>
                        {text}
                    </MenuItem>)}
            </MUISelect>
        </FormControl>
    );
};