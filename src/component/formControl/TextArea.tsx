import React from 'react';
import { ControlProps } from './FormControl';
import { handleOnChangeEvent } from './TextInput';
import TextField from '@material-ui/core/TextField';

export interface TextAreaProps extends ControlProps {
    initialRows?: number,
    expectedSymbolsPerRow: number,
    helperText?: string,
    value: string,
    onValueChange?: (value: string) => void
}

function computeRows(value: string, expectedSymbolsPerRow: number, initialRows?: number): number {
    let rows = 0;
    let afterNewLine = 0;
    const inital = !initialRows || (initialRows && (initialRows < 2)) ? 3 : Math.round(initialRows);
    for(let i = 0; i < value.length; ++i) {
        if(value[i] === '\n') {
            ++rows;
            afterNewLine = 0;
        } else {
            ++afterNewLine;
            if(afterNewLine > expectedSymbolsPerRow) {
                ++rows;
                afterNewLine = 0;
            }
        }
    }
    if(rows < inital) {
        return inital;
    }
    const additionalRows = Math.floor(afterNewLine / expectedSymbolsPerRow);
    return rows + additionalRows + 2;
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
    rows={computeRows(value, expectedSymbolsPerRow, initialRows)}
/>);

export default TextArea;