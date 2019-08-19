import React from 'react';
import { DatePicker as MuiDatePicker } from '@material-ui/pickers';
import DateType from './../../type/Date';
import {  ThemeProvider } from '@material-ui/styles';
import { datePickerTheme } from './../../theme';

export interface DatePickerProps {
    value: DateType,
    onChange: (date: DateType) => void,
    minDate?: DateType
};

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    onChange,
    minDate
}) => (
    <ThemeProvider theme={datePickerTheme}>
        <MuiDatePicker
            value={value}
            onChange={date => handleChange(date, value, onChange)}
            minDate={minDate}
            inputVariant='filled'
            disableFuture
            format='dd.MM.yyyy' />
    </ThemeProvider>
);

export default DatePicker;

function handleChange(selectedDate: DateType | null, currentDate: DateType, onChange: (date: DateType) => void): void {
    if((selectedDate !== null) && (selectedDate !== currentDate)) {
        onChange(selectedDate);
    }
}