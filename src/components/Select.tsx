import React from 'react';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl, {ControlProps} from './FormControl';
import MUISelect from '@material-ui/core/Select';

type EmptyValue = '';

export interface Option<Value>{
    value: Value,
    text: string
};

export interface SelectProps<Value> extends ControlProps {
    id: string
    value: Value | '',
    onValueChange: (value: Value) => void,
    onClose: () => void,
    notSelectedText: string,
    options: Array<Option<Value>>
};

type ChangeEvent = React.ChangeEvent<{name?: string; value: unknown}>;

function handleOnChangeEvent<Value>(
    currentValue: Value | '',
    onValueChange: (_: Value) => void,
    onClose: () => void
) {
    return (event: ChangeEvent) => {
        const eventValue = event.target.value as Value | '';
        if(eventValue !== '' && currentValue !== eventValue) {
            onValueChange(eventValue);
        }
        onClose();
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
        onClose,
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
                onChange={handleOnChangeEvent(value, onValueChange, onClose)}
                input={<FilledInput id={id} />}>
                {value === '' &&
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