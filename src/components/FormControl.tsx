import React from 'react';
import MUIFormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

export interface ControlProps {
    label: string,
    disabled?: boolean,
    required?: boolean,
    error?: string
};

export interface FormControlProps extends ControlProps {
    labelFor: string
}

const FormControl: React.FC<FormControlProps> = ({label, disabled, required, error, labelFor, children}) => (
    <MUIFormControl
        required={required}
        disabled={disabled}
        error={!!error}
        variant="filled"
        fullWidth>
        <InputLabel htmlFor={labelFor}>
            {label}
        </InputLabel>
        {children}
        {error && 
            <FormHelperText>
                {error}
            </FormHelperText>}
    </MUIFormControl>
);

export default FormControl;