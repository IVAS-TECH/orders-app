import React from 'react';
import { ControlProps } from './FormControl';
import { handleOnChangeEvent } from './Input';
import TextField from '@material-ui/core/TextField';

export interface TextAreaProps extends ControlProps {
    initialRows: number,
    expectedSymbolsPerRow: number,
    helperText: string,
    value: string,
    onValueChange: (value: string) => void
}

function computeRows(value: string, initialRows: number, expectedSymbolsPerRow: number): number {
    if(initialRows < 2) {
        return 2;
    }
    const { length } = value;
    const rows = Math.floor(length / expectedSymbolsPerRow);
    return rows < (initialRows + 1) ? initialRows : (rows + 2);
}

const TextArea: React.FC<TextAreaProps> = ({
    value,
    label,
    disabled,
    required,
    error,
    helperText,
    initialRows,
    expectedSymbolsPerRow,
    onValueChange
}) => (
<TextField
    fullWidth
    multiline    
    variant='outlined'
    label={label}
    value={value}
    disabled={disabled}
    required={required}
    error={!!error}
    onChange={handleOnChangeEvent(value, onValueChange)}
    helperText={error || helperText}
    rows={computeRows(value, initialRows, expectedSymbolsPerRow)}
/>);

export default TextArea;